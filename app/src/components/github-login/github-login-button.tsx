import { component$ } from "@builder.io/qwik";
import { useSignIn } from "~/routes/plugin@auth";
export type GitHubLoginButtonProps = {
};

export const GitHubLoginButton = component$<GitHubLoginButtonProps>(
  () => {
    const signIn = useSignIn();
    return (
      <button
        class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl cursor-pointer shadow-lg hover:shadow-purple-500/30 transition-all duration-300 font-medium"
        onClick$={() => signIn.submit({ providerId: "github", redirectTo: "/repos/list",  })}
      >
        Login with GitHub
      </button>
    );
  }
);
