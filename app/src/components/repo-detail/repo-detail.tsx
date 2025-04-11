import { component$ } from "@builder.io/qwik";
import { RepositoryDetails } from "~/api/types";
import {
  LuCode,
  LuGitFork,
  LuStar,
  LuGitBranch,
  LuExternalLink,
  LuEye,
  LuLock,
  LuUnlock,
} from "@qwikest/icons/lucide";
import { TopicModal } from "../modals/topic-modal";
import type { ActionStore } from "@builder.io/qwik-city";

export interface RepoDetailProps {
  repoDetails: RepositoryDetails;
  updateTopicsAction: ActionStore<
    { success: boolean },
    { owner: string; repo: string; topics: string[] }
  >;
}

export const RepoDetail = component$<RepoDetailProps>(
  ({ repoDetails, updateTopicsAction }) => {
    return (
      <div>
        {/* Header with repository name and avatar */}
        <div class="flex items-center gap-4 mb-6">
          {repoDetails.owner?.avatar_url && (
            <img
              src={repoDetails.owner.avatar_url}
              alt={repoDetails.owner.login}
              class="w-16 h-16 rounded-full border-2 border-gray-700 shadow-md"
            />
          )}
          <div>
            <h1 class="text-3xl font-bold text-purple-400 flex items-center gap-2">
              {repoDetails.name}
              {repoDetails.private ? (
                <LuLock class="h-5 w-5 text-gray-400" />
              ) : (
                <LuUnlock class="h-5 w-5 text-gray-400" />
              )}
            </h1>
            <div class="text-lg text-gray-400">
              {repoDetails.full_name}
            </div>
          </div>

          <div class="ml-auto">
            <button
              onClick$={() => {
                window.open(repoDetails.html_url, "_blank");
              }}
              class="flex items-center gap-2 px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-lg shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-purple-500/30 hover:-translate-y-0.5"
            >
              View on GitHub
              <LuExternalLink class="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {repoDetails.description && (
          <div class="bg-gray-700/50 p-6 rounded-xl mb-6">
            <h2 class="text-xl font-semibold mb-2 text-gray-200">Description</h2>
            <p class="text-gray-300">{repoDetails.description}</p>
          </div>
        )}

        {/* Stats */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gray-700/50 p-5 rounded-xl flex items-center gap-4">
            <div class="p-3 bg-gray-800 rounded-lg">
              <LuStar class="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-200">
                {repoDetails.stargazers_count.toLocaleString()}
              </div>
              <div class="text-sm text-gray-400">Stars</div>
            </div>
          </div>

          <div class="bg-gray-700/50 p-5 rounded-xl flex items-center gap-4">
            <div class="p-3 bg-gray-800 rounded-lg">
              <LuGitFork class="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-200">
                {repoDetails.forks_count.toLocaleString()}
              </div>
              <div class="text-sm text-gray-400">Forks</div>
            </div>
          </div>

          <div class="bg-gray-700/50 p-5 rounded-xl flex items-center gap-4">
            <div class="p-3 bg-gray-800 rounded-lg">
              <LuEye class="h-6 w-6 text-green-400" />
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-200">0</div>
              <div class="text-sm text-gray-400">Watchers</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Language */}
          {repoDetails.language && (
            <div class="bg-gray-700/50 p-5 rounded-xl">
              <h3 class="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                <LuCode class="h-5 w-5 text-purple-400" />
                Primary Language
              </h3>
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full bg-purple-500"></span>
                <span class="text-lg text-gray-300">{repoDetails.language}</span>
              </div>
            </div>
          )}

          {/* Default Branch */}
          <div class="bg-gray-700/50 p-5 rounded-xl">
            <h3 class="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
              <LuGitBranch class="h-5 w-5 text-purple-400" />
              Default Branch
            </h3>
            <div class="text-lg font-mono bg-gray-800 px-3 py-1 rounded inline-block text-gray-300">
              {repoDetails.default_branch}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div class="bg-gray-700/50 p-6 rounded-xl">
          <div class="flex justify-between gap-2">
            <h3 class="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
              <TopicModal
                topics={repoDetails.topics}
                updateTopicsAction={updateTopicsAction}
                owner={repoDetails.owner.login}
                repo={repoDetails.name}
              />
            </h3>
          </div>
          {repoDetails.topics && repoDetails.topics.length > 0 && (
            <div class="flex flex-wrap gap-2">
              {repoDetails.topics.map((topic) => (
                <div
                  key={topic}
                  class="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-lg font-mono text-sm border border-purple-800"
                >
                  {topic}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
