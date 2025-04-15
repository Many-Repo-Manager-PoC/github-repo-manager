import { $, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getRepositories } from "~/api/repos";
import { RepoCard } from "~/components/cards/repo-card";
import { SelectList } from "~/components/select-lists/select";
import { useSignal } from "@builder.io/qwik";
export const useUserRepositories = routeLoader$(async (requestEvent) => {
  requestEvent.cacheControl({
    maxAge: 300,
  });

  return await getRepositories(requestEvent);
});

export default component$(() => {
  const userRepoSignal = useUserRepositories();
  const filteredRepositories = useSignal(userRepoSignal.value.repositories);
  const filterOptions: Array<{ label: string; value: string }> = [
    {
      label: "All",
      value: "all",
    },
    { label: "User", value: "user" },
    { label: "Organization", value: "organization" },
  ];

  const selectedFilter = useSignal("all");
  const onFilterChange = $((value: string) => {
    selectedFilter.value = value;
    if(selectedFilter.value === 'user') {
      filteredRepositories.value = userRepoSignal.value.repositories.filter((repo) => repo.owner.type === 'User');
    } else if(selectedFilter.value === 'organization') {
      filteredRepositories.value = userRepoSignal.value.repositories.filter((repo) => repo.owner.type === 'Organization');
    } else {
      filteredRepositories.value = userRepoSignal.value.repositories;
    }
  });

  return (
    <div class="w-full max-w-7xl px-4 py-10">
      <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Your Repositories
      </h1>
      
      <div class="mb-8 flex w-full justify-center">
        <SelectList 
          options={filterOptions} 
          labelKey="label" 
          valueKey="value"
          label="Filter by owner type"
          placeholder="All repositories" 
          onChange={onFilterChange}
        />
      </div>
      
      <div class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRepositories.value.map((repo) => (
          <RepoCard key={repo.id} repoDetails={repo} />
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
