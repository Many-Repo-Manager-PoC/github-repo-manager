import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GitHubLoginButton } from "../components/github-login/github-login-button";
export default component$(() => {
  return (
    <>
      <div class="text-4xl font-bold my-4">
        Welcome to the GitHub Repo Manager
      </div>
      <GitHubLoginButton />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
