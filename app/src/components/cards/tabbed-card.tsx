import { component$, Signal } from "@builder.io/qwik";
import { GenericCard } from "./generic-card";
import { Tabs } from "@qwik-ui/headless";
import { DependentRepository, RepositoryDependencies, RepositoryDetails } from "~/api/types";
import { ActionStore } from "@builder.io/qwik-city";
import { RepoDetail } from "../repo-detail/repo-detail";
import { RepoDependencies } from "../repo-dependencies/repo-dependencies";
import { DependentRepositories } from "../dependent-repositories/dependent-repositories";

export interface TabbedCardProps {
  repoDetails: RepositoryDetails;
  repoDependencies: RepositoryDependencies;
  dependentRepositories: DependentRepository[];
  fetchDependencies: () => Promise<void>;
  fetchDependentRepositories: () => Promise<void>;
  isDesignSystem: boolean;
  updateTopicsAction: ActionStore<
    { success: boolean },
    { owner: string; repo: string; topics: string[] }
  >;
  createWorkflowDispatchAction: ActionStore<{
    success: boolean;
}, Record<string, unknown>, true>
}

export const TabbedCard = component$<TabbedCardProps>(({ 
  repoDetails, 
  updateTopicsAction, 
  repoDependencies, 
  dependentRepositories,
  fetchDependencies,
  fetchDependentRepositories,
  isDesignSystem,
  createWorkflowDispatchAction
}) => {
  
  return (
    <GenericCard>
      <div q:slot="header">
        <Tabs.Root selectedIndex={0} class="w-full">
          <Tabs.List class="flex flex-wrap border-b border-gray-700 mb-4">
            <Tabs.Tab class="cursor-pointer relative px-6 py-3 font-medium transition-colors text-gray-400 hover:text-gray-300 aria-[selected=true]:text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-transparent aria-[selected=true]:after:bg-purple-600">
                Details
            </Tabs.Tab>
            <Tabs.Tab onClick$={fetchDependencies} class="cursor-pointer relative px-6 py-3 font-medium transition-colors text-gray-400 hover:text-gray-300 aria-[selected=true]:text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-transparent aria-[selected=true]:after:bg-purple-600">
              Dependencies
            </Tabs.Tab>
            {isDesignSystem && (
              <Tabs.Tab onClick$={fetchDependentRepositories} class="cursor-pointer relative px-6 py-3 font-medium transition-colors text-gray-400 hover:text-gray-300 aria-[selected=true]:text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-transparent aria-[selected=true]:after:bg-purple-600">
                Dependent Repositories
              </Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel class="text-gray-300 py-2 mt-4">
            <RepoDetail repoDetails={repoDetails} updateTopicsAction={updateTopicsAction} />
          </Tabs.Panel>
          <Tabs.Panel class="text-gray-300 py-2 mt-4">
            <RepoDependencies repoDependencies={repoDependencies} />
          </Tabs.Panel>
          {isDesignSystem && (
            <Tabs.Panel class="text-gray-300 py-2 mt-4">
              <DependentRepositories dependentRepositories={dependentRepositories} targetPackageDetails={repoDependencies.packageDetails} createWorkflowDispatchAction={createWorkflowDispatchAction} />
            </Tabs.Panel>
          )}
        </Tabs.Root>
      </div>
    </GenericCard>
  );
});
