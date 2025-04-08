import { server$ } from "@builder.io/qwik-city";
import { Octokit } from "octokit";
import type { RequestEventLoader } from "@builder.io/qwik-city";
import type { Session } from "@auth/qwik";
import { Repository, RepositoryDetails } from "./types";

export const getRepositories = server$(
  async (requestEvent: RequestEventLoader) => {
    const session: Session = requestEvent.sharedMap.get("session");
    console.log({ session });
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
  async (requestEvent: RequestEventLoader, owner: string, repo: string) => {
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

      const {data: topics} = await octokit.rest.repos.getAllTopics({owner, repo})



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

/**
 * Search for specific files in a repository (like package.json)
 */
export const getRepositoryDependencies = server$(
  async (
    requestEvent: RequestEventLoader,
    owner: string,
    repo: string
  ) => {

    console.log('Searching for package.json in', owner, repo)

    const session: Session = requestEvent.sharedMap.get("session");

    if (!session) {
      throw new Error("Session not found");
    }

    try {
      const octokit = new Octokit({
        auth: session.accessToken,
      });

      // Construct a proper search query with the filename
      const queryString = `repo:${'QwikDev'}/${'qwik'} filename:package.json`;
      
      // Search for the specific file
      const { data: searchResults } = await octokit.rest.search.code({
        q: queryString,
      });

      console.log("Search results:", searchResults);

      // If file is found, fetch its content
      if (searchResults.total_count > 0) {
        const fileItem = searchResults.items[0]; // Get the first match
        console.log("Found file at path:", fileItem.path);
        
        // Get content of the file using the path from search results
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: fileItem.path // Use the path from search results
        });

       

        if (Array.isArray(fileData) || fileData.type !== "file" || !("content" in fileData)) {
          throw new Error("Not a regular file or content not available");
        }

        
      
        const content = Buffer.from(fileData.content, 'base64').toString("utf-8");
        
        // For package.json, parse it as JSON
        let parsedContent = null;

          try {
            parsedContent = JSON.parse(content);
          } catch (e) {
            console.error("Failed to parse package.json:", e);
          }

        console.log({ parsedContent });
        
        return {
          file: {
            name: fileData.name,
            path: fileData.path,
            sha: fileData.sha,
            content: content,
            parsed: parsedContent,
            html_url: fileData.html_url,
          },
          total_matches: searchResults.total_count,
          all_matches: searchResults.items.map(item => ({
            name: item.name,
            path: item.path,
            html_url: item.html_url
          }))
        };
      } else {
        return {
          file: null,
          total_matches: 0,
          all_matches: []
        };
      }
    } catch (error: any) {
      console.error("Error searching for file:", error);
      throw new Error(`Failed to find package.json: ${error.message}`);
    }
  }
);
