import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getRepositoryDetails, getRepositoryDependencies } from "~/api/repos";
import { RepoDetail } from "~/components/repo-detail/repo-detail";

export const useRepositoryDetails = routeLoader$(async (requestEvent) => {
  const {owner, repoName} = requestEvent.params;
  const repoDependencies = await getRepositoryDependencies(requestEvent, owner, repoName);
  return await getRepositoryDetails(requestEvent, owner, repoName);
});

export const useRepositoryDependencies = routeLoader$(async (requestEvent) => {
  const {owner, repoName} = requestEvent.params;
  return await getRepositoryDependencies(requestEvent, owner, repoName);
});

export default component$(() => {
  const repoDetailsSignal = useRepositoryDetails();
  const repoDependenciesSignal = useRepositoryDependencies();
  return (
    <div>
        <RepoDetail repoDetails={repoDetailsSignal.value.repository} />
      </div>
  );
});