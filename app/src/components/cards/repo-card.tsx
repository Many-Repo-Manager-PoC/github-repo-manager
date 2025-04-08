import { component$ } from "@builder.io/qwik";
import type { Repository } from "~/api/types";
import { 
LuCode, 
LuGitFork,
LuStar
} from "@qwikest/icons/lucide";
import { useNavigate } from "@builder.io/qwik-city";

interface RepoCardProps {
  repoDetails: Repository;
}

export const RepoCard = component$<RepoCardProps>(
  ({ repoDetails }) => {

    const navigate = useNavigate();

    return (
      <div 
        onClick$={() => {
          navigate(`/repos/${repoDetails.owner.login}/${repoDetails.name}`);
        }}
        class="bg-custom-neutral-0 dark:bg-custom-neutral-800 border-custom-neutral-200 dark:border-custom-neutral-600 rounded-3xl border p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer max-w-md w-full h-full min-h-[200px]"
      >
        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-col gap-3">
            <div class="flex gap-4 items-center">
              <div class="flex-shrink-0">
                {repoDetails.owner?.avatar_url && (
                  <img 
                    src={repoDetails.owner.avatar_url} 
                    alt={repoDetails.owner.login} 
                    width={48} 
                    height={48} 
                    class="h-12 w-12 rounded-full border-2 border-custom-neutral-200 dark:border-custom-neutral-700"
                  />
                )}
              </div>
              <div class="flex flex-col">
                <div class="text-xl font-bold text-custom-primary-600 dark:text-custom-primary-400 line-clamp-1">
                  {repoDetails.name}
                </div>
                <div class="text-sm text-custom-neutral-500 dark:text-custom-neutral-400 line-clamp-1">
                  {repoDetails.full_name}
                </div>
              </div>
            </div>
            
            {repoDetails.description && (
              <div class="text-sm text-custom-neutral-700 dark:text-custom-neutral-300 line-clamp-2 mt-1 min-h-[40px]">
                {repoDetails.description}
              </div>
            )}
            
            <div class="flex gap-6 mt-4 text-sm text-custom-neutral-600 dark:text-custom-neutral-400">
              <div class="flex items-center gap-1.5">
                <LuStar class="h-5 w-5" />
                <span>{repoDetails.stargazers_count}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <LuGitFork class="h-5 w-5" />
                <span>{repoDetails.forks_count}</span>
              </div>
              {repoDetails.language && (
                <div class="flex items-center gap-1.5">
                  <LuCode class="h-5 w-5" />
                  <span>{repoDetails.language}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);