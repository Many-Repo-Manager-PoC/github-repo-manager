import { component$ } from "@builder.io/qwik";

export interface RepoDependenciesProps {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export const RepoDependencies = component$<RepoDependenciesProps>(
  ({ dependencies, devDependencies }) => {

    return (
      <div class="max-w-5xl mx-auto px-4 py-8">
        <div class="rounded-3xl shadow-xl overflow-hidden bg-gray-800 border border-gray-700">
          <div class="px-8 pt-8">
            <h2 class="text-xl font-bold text-purple-400 mb-4">Dependencies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(dependencies).length > 0 ? (
                Object.entries(dependencies).map(([key, value]) => (
                  <div key={key} class="bg-gray-700 p-5 rounded-xl flex items-center justify-between hover:bg-gray-600 transition-colors">
                    <span class="font-medium text-gray-200">{key}</span>
                    <span class="text-sm bg-gray-800 px-3 py-1 rounded-lg text-purple-300">{value}</span>
                  </div>
                ))
              ) : (
                <div class="bg-gray-700 p-5 rounded-xl text-gray-400 col-span-2">No dependencies found</div>
              )}
            </div>
          
            <h2 class="text-xl font-bold text-purple-400 mb-4">Dev Dependencies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(devDependencies).length > 0 ? (
                Object.entries(devDependencies).map(([key, value]) => (
                  <div key={key} class="bg-gray-700 p-5 rounded-xl flex items-center justify-between hover:bg-gray-600 transition-colors">
                    <span class="font-medium text-gray-200">{key}</span>
                    <span class="text-sm bg-gray-800 px-3 py-1 rounded-lg text-purple-300">{value}</span>
                  </div>
                ))
              ) : (
                <div class="bg-gray-700 p-5 rounded-xl text-gray-400 col-span-2">No dev dependencies found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
