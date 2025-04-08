import { component$ } from "@builder.io/qwik";
import { RepositoryDetails } from "~/api/types";
import {
  LuCode,
  LuGitFork,
  LuStar,
  LuGitBranch,
  LuExternalLink,
  LuTag,
  LuEye,
  LuLock,
  LuUnlock,
} from "@qwikest/icons/lucide";

export interface RepoDetailProps {
  repoDetails: RepositoryDetails;
}

export const RepoDetail = component$<RepoDetailProps>(({ repoDetails }) => {
  return (
    <div class="max-w-5xl mx-auto px-4 py-8">
      <div class="rounded-3xl shadow-xl overflow-hidden">
        <div class="px-8 pt-8">
          <div class="flex items-center gap-4 mb-6">
            {repoDetails.owner?.avatar_url && (
              <img
                src={repoDetails.owner.avatar_url}
                alt={repoDetails.owner.login}
                class="w-16 h-16 rounded-full border-2 border-custom-neutral-200 shadow-md"
              />
            )}
            <div>
              <h1 class="text-3xl font-bold text-custom-primary-600 flex items-center gap-2">
                {repoDetails.name}
                {repoDetails.private ? (
                  <LuLock class="h-5 w-5 text-custom-neutral-500" />
                ) : (
                  <LuUnlock class="h-5 w-5 text-custom-neutral-500" />
                )}
              </h1>
              <div class="text-lg text-custom-neutral-500">
                {repoDetails.full_name}
              </div>
            </div>

            <div class="ml-auto">
              <button
                onClick$={() => {
                  window.open(repoDetails.html_url, "_blank");
                }}
                class="flex items-center gap-2 px-4 py-2 bg-custom-primary-100 hover:bg-custom-primary-200 text-custom-primary-700 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md transform hover:-translate-y-0.5"
              >
                View on GitHub
                <LuExternalLink class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="px-8">
          {/* Description */}
          {repoDetails.description && (
            <div class="bg-custom-neutral-100 p-6 rounded-xl mb-8">
              <h2 class="text-xl font-semibold mb-2">Description</h2>
              <p class="text-custom-neutral-700">{repoDetails.description}</p>
            </div>
          )}

          {/* Stats */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-custom-neutral-100 p-5 rounded-xl flex items-center gap-4">
              <div class="p-3 bg-custom-primary-100 rounded-lg">
                <LuStar class="h-6 w-6 text-custom-primary-500" />
              </div>
              <div>
                <div class="text-2xl font-bold">
                  {repoDetails.stargazers_count.toLocaleString()}
                </div>
                <div class="text-sm text-custom-neutral-500">Stars</div>
              </div>
            </div>

            <div class="bg-custom-neutral-100 p-5 rounded-xl flex items-center gap-4">
              <div class="p-3 bg-custom-primary-100 rounded-lg">
                <LuGitFork class="h-6 w-6 text-custom-primary-500" />
              </div>
              <div>
                <div class="text-2xl font-bold">
                  {repoDetails.forks_count.toLocaleString()}
                </div>
                <div class="text-sm text-custom-neutral-500">Forks</div>
              </div>
            </div>

            <div class="bg-custom-neutral-100 p-5 rounded-xl flex items-center gap-4">
              <div class="p-3 bg-custom-primary-100 rounded-lg">
                <LuEye class="h-6 w-6 text-custom-primary-500" />
              </div>
              <div>
                <div class="text-2xl font-bold">0</div>
                <div class="text-sm text-custom-neutral-500">Watchers</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Language */}
            {repoDetails.language && (
              <div class="bg-custom-neutral-100 p-5 rounded-xl">
                <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                  <LuCode class="h-5 w-5 text-custom-primary-500" />
                  Primary Language
                </h3>
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 rounded-full bg-custom-primary-500"></span>
                  <span class="text-lg">{repoDetails.language}</span>
                </div>
              </div>
            )}

            {/* Default Branch */}
            <div class="bg-custom-neutral-100 p-5 rounded-xl">
              <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                <LuGitBranch class="h-5 w-5 text-custom-primary-500" />
                Default Branch
              </h3>
              <div class="text-lg font-mono bg-custom-neutral-200 px-3 py-1 rounded inline-block">
                {repoDetails.default_branch}
              </div>
            </div>
          </div>

          {/* Tags */}
          {repoDetails.topics && repoDetails.topics.length > 0 && (
            <div class="bg-custom-neutral-100 p-6 rounded-xl">
              <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                <LuTag class="h-5 w-5 text-custom-primary-500" />
                Topics
              </h3>
              <div class="flex flex-wrap gap-2">
                {repoDetails.topics.map((topic) => (
                  <div
                    key={topic}
                    class="bg-custom-primary-100 text-custom-primary-700 px-3 py-1 rounded-lg font-mono text-sm"
                  >
                    {topic}   
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
