import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  RequestHandler,
} from "@builder.io/qwik-city";
import {
  getRepositoryDetails,
  getRepositoryDependencies,
  updateRepositoryTopics,
  getDependentRepositories,
} from "~/api/repos";
import { DependentRepository } from "~/api/types";
import { TabbedCard } from "~/components/cards/tabbed-card";

export const useRepositoryDetails = routeLoader$(async (requestEvent) => {
  const { owner, repoName } = requestEvent.params;
  const ownerType = requestEvent.url.searchParams.get('type') ?? "";

  const repoDetails = await getRepositoryDetails(requestEvent, owner, repoName);
  const repoDependencies = await getRepositoryDependencies(
    requestEvent,
    owner,
    repoName
  );
  let dependentRepositories: DependentRepository[] = [];

  const isDesignSystem =
    repoDetails.repository.topics.includes("design-system");

  if (isDesignSystem) {
    dependentRepositories = await getDependentRepositories(
      requestEvent,
      owner,
      ownerType,
      repoDependencies.packageDetails
    );
  }

  return {
    repoDetails: repoDetails.repository,
    repoDependencies,
    dependentRepositories,
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

export default component$(() => {
  const {
    value: { repoDetails, repoDependencies, dependentRepositories },
  } = useRepositoryDetails();

  const updateTopicsAction = useUpdateTopics();

  return (
    <div class="w-full max-w-5xl  px-4 py-10">
      <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Repository Details
      </h1>
      <div class="grid grid-cols-1 gap-6 items-center justify-center">
        <TabbedCard
          repoDetails={repoDetails}
          updateTopicsAction={updateTopicsAction}
          repoDependencies={repoDependencies}
          dependentRepositories={dependentRepositories}
        />
      </div>
    </div>
  );
});
