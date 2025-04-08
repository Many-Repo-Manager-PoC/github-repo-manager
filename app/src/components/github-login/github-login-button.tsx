import { component$ } from "@builder.io/qwik";
import { useSignIn } from "~/routes/plugin@auth";
export type GitHubLoginButtonProps = {
};

export const GitHubLoginButton = component$<GitHubLoginButtonProps>(
  () => {
    const signIn = useSignIn();
    return (
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        onClick$={() => signIn.submit({ providerId: "github", redirectTo: "/repos/list",  })}
      >
        Login with GitHub
      </button>
    );
  }
);
