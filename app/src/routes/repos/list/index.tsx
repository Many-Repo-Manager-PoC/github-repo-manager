import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getRepositories } from "~/api/repos";
import { RepoCard } from "~/components/cards/repo-card";
export const useUserRepositories = routeLoader$(async (requestEvent) => {
  return await getRepositories(requestEvent);
});

export default component$(() => {
  const userRepoSignal = useUserRepositories();


  return (
    <div class="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {userRepoSignal.value.repositories.map((repo) => (
          <RepoCard
            key={repo.id}
            repoDetails={repo}
          />
        ))}
      </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
