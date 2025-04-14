import { component$, Signal } from "@builder.io/qwik";
import { DependentRepository } from "~/api/types";
import { LuPackage, LuCode, LuGitBranch } from "@qwikest/icons/lucide";

export interface DependentRepositoriesProps {
  dependentRepositories: DependentRepository[];
}

export const DependentRepositories = component$<DependentRepositoriesProps>(
  ({ dependentRepositories }) => {
    return (
      <div>
        <h2 class="text-2xl font-bold mb-4 text-purple-400">
          Found {dependentRepositories.length} Dependent Repositories:
        </h2>
        
        <div class="grid grid-cols-1 gap-4">
          {dependentRepositories.map((repo) => (
            <div 
              key={repo.id} 
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
                    
                    <div class="flex items-center bg-gray-700/40 rounded-lg px-4 py-3">
                      <span class="text-gray-400 mr-3">Version:</span>
                      <span class="font-mono bg-gray-900/80 px-3 py-1 rounded-md text-green-300">
                        {repo.targetDependency.version}
                      </span>
                    </div>
                  </div>
                  
                  <div class="mt-3 flex items-center text-sm">
                    <LuCode class="w-4 h-4 text-gray-500 mr-2" />
                    <span class="text-gray-500 font-mono">{repo.file_path}</span>
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
