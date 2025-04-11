import { component$, Signal, useComputed$ } from "@builder.io/qwik";
import { Collapsible } from "@qwik-ui/headless";
import { LuChevronDown, LuPackage, LuWrench } from "@qwikest/icons/lucide";

export interface RepoDependenciesProps {
  repoDependencies: Readonly<
    Signal<{
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }>
  >;
}

export const RepoDependencies = component$<RepoDependenciesProps>(
  ({ repoDependencies }) => {
    const dependencies = useComputed$<Record<string, string>>(
      () => repoDependencies.value.dependencies
    );
    const devDependencies = useComputed$<Record<string, string>>(
      () => repoDependencies.value.devDependencies
    );

    return (
      <div>
        {/* Dependencies section */}
        <div class="mb-8">
          <Collapsible.Root>
            <Collapsible.Trigger class="collapsible-trigger w-full text-left flex items-center justify-between px-5 py-4 bg-gray-800/80 hover:bg-gray-800 rounded-xl mb-2 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md border border-gray-700 hover:border-purple-600/30">
              <h2 class="text-xl font-bold text-purple-400 flex items-center">
                <span class="bg-purple-500/20 p-2 rounded-lg mr-3">
                  <LuPackage class="w-4 h-4 text-purple-400" />
                </span>
                Dependencies
              </h2>
              <div class="collapsible-chevron text-purple-400">
                <LuChevronDown class="w-4 h-4" />
              </div>
            </Collapsible.Trigger>

            <Collapsible.Content class="collapsible-content overflow-hidden">
              <div class="mt-3 px-2">
                {Object.keys(dependencies.value).length === 0 ? (
                  <div class="bg-gray-700/50 p-5 rounded-xl text-gray-400 border border-gray-700 text-center">
                    No dependencies found
                  </div>
                ) : (
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(dependencies.value).map(
                      ([name, version]) => (
                        <div
                          key={name}
                          class="bg-gray-700/50 p-5 rounded-xl flex items-center justify-between hover:bg-gray-700 transition-colors border border-gray-700"
                        >
                          <span class="font-medium text-gray-200">{name}</span>
                          <span class="text-sm bg-gray-800 px-3 py-1.5 rounded-lg text-purple-300 font-mono shadow-sm">
                            {version}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>

        {/* Dev Dependencies section */}
        <div class="mb-8">
          <Collapsible.Root open>
            <Collapsible.Trigger class="collapsible-trigger w-full text-left flex items-center justify-between px-5 py-4 bg-gray-800/80 hover:bg-gray-800 rounded-xl mb-2 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md border border-gray-700 hover:border-purple-600/30">
              <h2 class="text-xl font-bold text-purple-400 flex items-center">
                <span class="bg-blue-500/20 p-2 rounded-lg mr-3">
                  <LuWrench class="w-4 h-4 text-blue-400" />
                </span>
                Dev Dependencies
              </h2>
              <div class="collapsible-chevron text-purple-400">
                <LuChevronDown class="w-4 h-4" />
              </div>
            </Collapsible.Trigger>

            <Collapsible.Content class="collapsible-content overflow-hidden">
              <div class="mt-3 px-2">
                {Object.keys(devDependencies.value).length === 0 ? (
                  <div class="bg-gray-700/50 p-5 rounded-xl text-gray-400 border border-gray-700 text-center">
                    No dev dependencies found
                  </div>
                ) : (
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(devDependencies.value).map(
                      ([name, version]) => (
                        <div
                          key={name}
                          class="bg-gray-700/50 p-5 rounded-xl flex items-center justify-between hover:bg-gray-700 transition-colors border border-gray-700"
                        >
                          <span class="font-medium text-gray-200">{name}</span>
                          <span class="text-sm bg-gray-800 px-3 py-1.5 rounded-lg text-blue-300 font-mono shadow-sm">
                            {version}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      </div>
    );
  }
);
