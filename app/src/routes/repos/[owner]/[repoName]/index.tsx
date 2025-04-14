import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, RequestHandler } from "@builder.io/qwik-city";
import { getRepositoryDetails, getRepositoryDependencies, updateRepositoryTopics } from "~/api/repos";
import { TabbedCard } from "~/components/cards/tabbed-card";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

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