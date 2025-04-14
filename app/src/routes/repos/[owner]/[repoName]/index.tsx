import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, RequestHandler } from "@builder.io/qwik-city";
import { getRepositoryDetails, getRepositoryDependencies, updateRepositoryTopics, getDependentRepositories } from "~/api/repos";
import { TabbedCard } from "~/components/cards/tabbed-card";

export const useDependentRepositories = routeLoader$(async (requestEvent) => {
  const {owner, repoName} = requestEvent.params;
  return await getDependentRepositories(requestEvent, owner, repoName);
});

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
  const dependentRepositoriesSignal = useDependentRepositories();
  return (
    <div class="w-full max-w-5xl  px-4 py-10">
      <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Repository Details
      </h1>
      <div class="grid grid-cols-1 gap-6 items-center justify-center">

        <TabbedCard 
          repoDetails={repoDetailsSignal.value.repository} 
          updateTopicsAction={updateTopicsAction}
          repoDependencies={repoDependenciesSignal} 
        />
      </div>
    </div>
  );
});