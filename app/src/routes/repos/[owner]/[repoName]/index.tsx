import { component$, useTask$, useSignal, $ } from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  RequestHandler,
  useLocation,
} from "@builder.io/qwik-city";
import {
  getRepositoryDetails,
  getRepositoryDependencies,
  updateRepositoryTopics,
  getDependentRepositories,
  createWorkflowDispatch,
} from "~/api/repos";
import { DependentRepository, RepositoryDependencies, CreateWorkflowDispatchProps } from "~/api/types";
import { TabbedCard } from "~/components/cards/tabbed-card";
import { useSession } from "~/routes/plugin@auth";

export const useRepositoryDetails = routeLoader$(async (requestEvent) => {
  const { owner, repoName } = requestEvent.params;
  const repoDetails = await getRepositoryDetails(requestEvent, owner, repoName);

  const isDesignSystem =
    repoDetails.repository.topics.includes("design-system");

  return {
    repoDetails: repoDetails.repository,
    isDesignSystem,
  };
});

export const useUpdateTopics = routeAction$(async (data, requestEvent) => {
  try {
    const owner = data.owner as string;
    const repo = data.repo as string;
    const topics = data.topics as string[];

    // Call the server function with the request event
    await updateRepositoryTopics(requestEvent, owner, repo, topics);
    return { success: true };
  } catch (error) {
    console.error("Error updating topics:", error);
    return { success: false, error: String(error) };
  }
});

export const useCreateWorkflowDispatch = routeAction$(async (data, requestEvent) => {
  const values = data as CreateWorkflowDispatchProps;
  await createWorkflowDispatch(requestEvent, "benjamin-kunai", "github-repo-manager", {
    packageDetails: { name: values.packageDetails.name, version: values.packageDetails.version },
    owner: values.owner,
    repo: values.repo,
  });
    return { success: true };
});

export default component$(() => {
  const session = useSession();
  const {params, url} = useLocation();
  const { owner, repoName } = params;
  const ownerType = url.searchParams.get('type') ?? "";

  const dependentRepositories = useSignal<DependentRepository[]>([]);
  const repoDependencies = useSignal<RepositoryDependencies>({
    packageDetails: { name: "", version: "" },
    dependencies: {},
    devDependencies: {},
  });

  const {
    value: { repoDetails, isDesignSystem },
  } = useRepositoryDetails();
  const updateTopicsAction = useUpdateTopics();
  const createWorkflowDispatchAction = useCreateWorkflowDispatch();
  const fetchDependencies = $(async () => {
    repoDependencies.value = await getRepositoryDependencies(
      session.value,
      owner,
      repoName
    );
  });

  const fetchDependentRepositories = $(async () => {
    dependentRepositories.value = await getDependentRepositories(
      session.value,
      owner,
      ownerType,
      repoDependencies.value.packageDetails
    );
  });

  return (
    <div class="w-full max-w-5xl  px-4 py-10">
      <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Repository Details
      </h1>
      <div class="grid grid-cols-1 gap-6 items-center justify-center">
        <TabbedCard
          repoDetails={repoDetails}
          updateTopicsAction={updateTopicsAction}
          repoDependencies={repoDependencies.value}
          dependentRepositories={dependentRepositories.value}
          fetchDependencies={fetchDependencies}
          fetchDependentRepositories={fetchDependentRepositories}
          isDesignSystem={isDesignSystem}
          createWorkflowDispatchAction={createWorkflowDispatchAction}
        />
      </div>
    </div>
  );
});
