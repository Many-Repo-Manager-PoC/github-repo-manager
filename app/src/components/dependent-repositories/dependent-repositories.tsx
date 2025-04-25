import { component$ } from "@builder.io/qwik";
import { DependentRepository, PackageDetails } from "~/api/types";
import { LuPackage, LuCode, LuGitBranch, LuAlertCircle, LuArrowUpCircle, LuCheckCircle } from "@qwikest/icons/lucide";
import { ActionStore } from "@builder.io/qwik-city";
export interface DependentRepositoriesProps {
  dependentRepositories: DependentRepository[];
  targetPackageDetails: PackageDetails;
  createWorkflowDispatchAction: ActionStore<{
    success: boolean;
}, Record<string, unknown>, true>
}

export const DependentRepositories = component$<DependentRepositoriesProps>(
  ({ dependentRepositories, targetPackageDetails, createWorkflowDispatchAction }) => {
    return (
      <div>
        {/* Package info section */}
        <div class="mb-8">
          <div class="px-5 py-6 bg-gray-800/80 rounded-xl mb-2 shadow-sm border border-gray-700">
            <h2 class="text-xl font-bold text-green-400 flex items-center mb-4">
              <span class="bg-green-500/20 p-2 rounded-lg mr-3">
                <LuPackage class="w-4 h-4 text-green-400" />
              </span>
              Package Details
            </h2>
            <div class="bg-gray-700/50 p-5 rounded-xl border border-gray-700">
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-300">Package Name</span>
                  <span class="text-sm bg-gray-800 px-3 py-1.5 rounded-lg text-green-300 font-mono shadow-sm">
                    {targetPackageDetails.name}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-300">Version</span>
                  <span class="text-sm bg-gray-800 px-3 py-1.5 rounded-lg text-green-300 font-mono shadow-sm">
                    {targetPackageDetails.version}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold mb-4 text-purple-400">
          Found {dependentRepositories.length} Dependent Repositories:
        </h2>
        
        <div class="grid grid-cols-1 gap-4">
          {dependentRepositories.map((repo, index) => (
            <div 
              key={index} 
              class="bg-gray-800/60 p-5 rounded-xl border border-gray-700 hover:border-purple-600/30 hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div class="flex items-start gap-4">
                <div class="bg-purple-500/20 p-2 rounded-lg">
                  <LuGitBranch class="w-5 h-5 text-purple-400" />
                </div>
                
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-200 mb-1">{repo.full_name}</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div class="flex items-center bg-gray-700/40 rounded-lg px-4 py-3">
                      <span class="text-gray-400 mr-3">Dependency Type:</span>
                      <span class={`font-medium ${repo.targetDependency.type === 'dependency' ? 'text-purple-300' : 'text-blue-300'}`}>
                        {repo.targetDependency.type === 'dependency' ? 'Regular Dependency' : 'Dev Dependency'}
                      </span>
                    </div>
                    
                    <div class="flex items-center justify-between bg-gray-700/40 rounded-lg px-4 py-3">
                      <div class="flex items-center">
                        <span class="text-gray-400 mr-3">Version:</span>
                        <span class={`font-mono px-3 py-1 rounded-md ${
                          repo.targetDependency.outOfDate 
                            ? 'bg-red-900/30 text-red-300 border border-red-700/50' 
                            : 'bg-green-900/30 text-green-300 border border-green-700/50'
                        }`}>
                          {repo.targetDependency.version}
                        </span>
                      </div>
                      
                      {repo.targetDependency.outOfDate ? (
                        <span class="ml-2 flex items-center text-red-400">
                          <LuAlertCircle class="w-4 h-4 mr-1" />
                          <span class="text-xs">Outdated</span>
                        </span>
                      ) : (
                        <span class="ml-2 flex items-center text-green-400">
                          <LuCheckCircle class="w-4 h-4 mr-1" />
                          <span class="text-xs">Current</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center mt-3">
                    <div class="flex items-center text-sm">
                      <LuCode class="w-4 h-4 text-gray-500 mr-2" />
                      <span class="text-gray-500 font-mono">{repo.file_path}</span>
                    </div>
                    
                    {repo.targetDependency.outOfDate && (
                      <button
                        class="flex items-center bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 px-3 py-2 rounded-lg text-sm transition-colors duration-200 border border-purple-600/30 cursor-pointer"
                        onClick$={() => createWorkflowDispatchAction.submit({
                          repo: repo.name,
                          owner: repo.owner,
                          packageDetails: targetPackageDetails,
                        })}
                      >
                        <LuArrowUpCircle class="w-4 h-4 mr-2" />
                        Update to Latest
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
