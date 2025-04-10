import { server$ } from "@builder.io/qwik-city";
import { Octokit } from "octokit";
import type { RequestEventLoader, RequestEventAction } from "@builder.io/qwik-city";
import type { Session } from "@auth/qwik";
import { Repository, RepositoryDetails } from "./types";

export const getRepositories = server$(
  async (requestEvent: RequestEventLoader) => {
    const session: Session = requestEvent.sharedMap.get("session");
    if (!session) {
      throw new Error("Session not found");
    }

    const octokit = new Octokit({
      auth: session.accessToken,
    });
    // get the user's repositories
    const { data } = await octokit.rest.repos.listForAuthenticatedUser();
    const repositories: Repository[] = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      private: repo.private,
      default_branch: repo.default_branch,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
      },
    }));
    return { repositories };
  }
);

/**
 * Get a repository by owner and name
 */
export const getRepositoryDetails = server$(
  async function (requestEvent: RequestEventLoader, owner: string, repo: string) {

    const session: Session = requestEvent.sharedMap.get("session");

    if (!session) {
      throw new Error("Session not found");
    }

    try {
      const octokit = new Octokit({
        auth: session.accessToken,
      });

      // Get the specific repository
      const { data: repoData } = await octokit.rest.repos.get({
        owner,
        repo,
      });

      const { data: topics } = await octokit.rest.repos.getAllTopics({
        owner,
        repo,
      });

      // Map to our Repository type
      const repository: RepositoryDetails = {
        id: repoData.id,
        name: repoData.name,
        full_name: repoData.full_name,
        description: repoData.description,
        language: repoData.language,
        stargazers_count: repoData.stargazers_count,
        forks_count: repoData.forks_count,
        private: repoData.private,
        default_branch: repoData.default_branch,
        html_url: repoData.html_url,
        topics: topics.names,
        owner: {
          login: repoData.owner.login,
          avatar_url: repoData.owner.avatar_url,
          html_url: repoData.owner.html_url,
        },
      };

      return { repository };
    } catch (error: any) {
      console.error("Error fetching repository:", error);
      throw new Error(`Failed to fetch repository: ${error.message}`);
    }
  }
);

export const getRepositoryDependencies = server$(
  async (requestEvent: RequestEventLoader, owner: string, repo: string) => {
    const session: Session = requestEvent.sharedMap.get("session");

    if (!session) {
      throw new Error("Session not found");
    }

    const octokit = new Octokit({
      auth: session.accessToken,
    });

    // Construct a proper search query with the filename
    const queryString = `repo:${owner}/${repo} filename:package.json`;

    // Search for the specific file
    const { data: searchResults } = await octokit.rest.search.code({
      q: queryString,
    });

    // If file is found, fetch its content
    if (searchResults.total_count > 0) {
      const fileItem = searchResults.items[0]; // Get the first match

      // Get content of the file using the path from search results
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: fileItem.path, // Use the path from search results
      });

      if (
        Array.isArray(fileData) ||
        fileData.type !== "file" ||
        !("content" in fileData)
      ) {
        return {
          dependencies: {},
          devDependencies: {},
        };
      }

      const content = Buffer.from(fileData.content, "base64").toString("utf-8");
      const parsedContent = JSON.parse(content);

      const dependencies: Record<string, string> =
        parsedContent?.dependencies ?? {};
      const devDependencies: Record<string, string> =
        parsedContent?.devDependencies ?? {};

      return {
        dependencies,
        devDependencies,
      };
    }

    // Return empty objects when no package.json is found
    return {
      dependencies: {},
      devDependencies: {},
    };
  }
);

export const updateRepositoryTopics = server$(
  async (
    requestEvent: RequestEventAction,
    owner: string,
    repo: string,
    topics: string[]
  ) => {
    const session: Session = requestEvent.sharedMap.get("session");

    if (!session) {
      throw new Error("Session not found");
    }

    const octokit = new Octokit({
      auth: session.accessToken,
    });

    await octokit.rest.repos.replaceAllTopics({
      owner,
      repo,
      names: topics,
    });
  }
);
