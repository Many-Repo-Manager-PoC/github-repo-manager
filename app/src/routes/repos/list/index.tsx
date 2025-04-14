import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getRepositories } from "~/api/repos";
import { RepoCard } from "~/components/cards/repo-card";
export const useUserRepositories = routeLoader$(async (requestEvent) => {
  requestEvent.cacheControl({
    maxAge: 300,
  })

  return await getRepositories(requestEvent);
});

export default component$(() => {
  const userRepoSignal = useUserRepositories();

  return (
    <div class="w-full max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Your Repositories
      </h1>
      <div class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userRepoSignal.value.repositories.map((repo) => (
          <RepoCard
            key={repo.id}
            repoDetails={repo}
          />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Your Repositories | GitHub Repo Manager",
  meta: [
    {
      name: "description",
      content: "Manage your GitHub repositories with ease",
    },
  ],
};
