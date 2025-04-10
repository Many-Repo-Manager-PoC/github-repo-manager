import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$ } from "@builder.io/qwik-city";
import { getRepositoryDetails, getRepositoryDependencies, updateRepositoryTopics } from "~/api/repos";
import { RepoDetail } from "~/components/repo-detail/repo-detail";
import { RepoDependencies } from "~/components/repo-dependencies/repo-dependencies";

export const useRepositoryDetails = routeLoader$(async (requestEvent) => {
  const {owner, repoName} = requestEvent.params;
  return await getRepositoryDetails(requestEvent, owner, repoName);
});

export const useRepositoryDependencies = routeLoader$(async (requestEvent) => {
  const {owner, repoName} = requestEvent.params;
  return await getRepositoryDependencies(requestEvent, owner, repoName);
});

export const useUpdateTopics = routeAction$(async (data, requestEvent) => {
  try {
    // console.log({data})
    const owner = data.owner as string;
    const repo = data.repo as string;
    const topics = data.topics as string[];
    
    // Call the server function with the request event
    await updateRepositoryTopics(
      requestEvent,
      owner,
      repo,
      topics
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating topics:', error);
    return { success: false, error: String(error) };
  }
});

export default component$(() => {
  const repoDetailsSignal = useRepositoryDetails();
  const repoDependenciesSignal = useRepositoryDependencies();
  const updateTopicsAction = useUpdateTopics();
  
  return (
    <div class="grid grid-cols-1 justify-center gap-5 lg:grid-cols-2">
        <RepoDetail 
          repoDetails={repoDetailsSignal.value.repository} 
          updateTopicsAction={updateTopicsAction}
        />
        <RepoDependencies 
          dependencies={repoDependenciesSignal.value.dependencies} 
          devDependencies={repoDependenciesSignal.value.devDependencies} 
        />
      </div>
  );
});