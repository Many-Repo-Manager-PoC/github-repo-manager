import { component$ } from "@builder.io/qwik";

export interface RepoDependenciesProps {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export const RepoDependencies = component$<RepoDependenciesProps>(
  ({ dependencies, devDependencies }) => {

    return (
      <div class="max-w-5xl mx-auto px-4 py-8">
        <div class="rounded-3xl shadow-xl overflow-hidden">
          <div class="px-8 pt-8">
            <h2 class="text-xl font-bold text-custom-primary-600 mb-4">Dependencies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(dependencies).length > 0 ? (
                Object.entries(dependencies).map(([key, value]) => (
                  <div key={key} class="bg-custom-neutral-100 p-5 rounded-xl flex items-center justify-between">
                    <span class="font-medium text-custom-neutral-700">{key}</span>
                    <span class="text-sm bg-custom-neutral-200 px-2 py-1 rounded text-custom-neutral-600">{value}</span>
                  </div>
                ))
              ) : (
                <div class="bg-custom-neutral-100 p-5 rounded-xl text-custom-neutral-500 col-span-2">No dependencies found</div>
              )}
            </div>
          
            <h2 class="text-xl font-bold text-custom-primary-600 mb-4">Dev Dependencies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(devDependencies).length > 0 ? (
                Object.entries(devDependencies).map(([key, value]) => (
                  <div key={key} class="bg-custom-neutral-100 p-5 rounded-xl flex items-center justify-between">
                    <span class="font-medium text-custom-neutral-700">{key}</span>
                    <span class="text-sm bg-custom-neutral-200 px-2 py-1 rounded text-custom-neutral-600">{value}</span>
                  </div>
                ))
              ) : (
                <div class="bg-custom-neutral-100 p-5 rounded-xl text-custom-neutral-500 col-span-2">No dev dependencies found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
