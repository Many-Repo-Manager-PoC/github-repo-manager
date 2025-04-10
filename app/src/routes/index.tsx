import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GitHubLoginButton } from "../components/github-login/github-login-button";
export default component$(() => {
  return (
    <>
      <div class="text-5xl font-bold my-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        GitHub Repo Manager
      </div>
      <GitHubLoginButton />
    </>
  );
});

export const head: DocumentHead = {
  title: "GitHub Repo Manager",
  meta: [
    {
      name: "description",
      content: "Manage your GitHub repositories with ease",
    },
  ],
};
