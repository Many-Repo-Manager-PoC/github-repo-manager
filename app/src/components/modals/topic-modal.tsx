import { $, component$, useSignal } from "@builder.io/qwik";
import { Modal, Label } from "@qwik-ui/headless";
import { LuTag, LuX } from "@qwikest/icons/lucide";
import { TopicPill } from "~/components/pills/topic-pill";
import type { ActionStore } from "@builder.io/qwik-city";

export interface TopicModalProps {
  topics: string[];
  updateTopicsAction: ActionStore<
    { success: boolean },
    { owner: string; repo: string; topics: string[] }
  >;
  owner: string;
  repo: string;
}

export const TopicModal = component$<TopicModalProps>(
  ({ topics, updateTopicsAction, owner, repo }) => {
    const localTopics = useSignal<string[]>(topics);
    const topicInput = useSignal<string>("");

    const removeTopic = $((topic: string) => {
      localTopics.value = localTopics.value.filter((t) => t !== topic);
    });

    const onSave = $(async () => {
      const newTopics = topicInput.value
        .split(",")
        .filter(Boolean)
        .map((topic) => topic.trim());
      console.log({ newTopics });
      localTopics.value = [...localTopics.value, ...newTopics];
      topicInput.value = "";

      // Submit the updated topics to the server
      await updateTopicsAction.submit({
        owner,
        repo,
        topics: localTopics.value,
      });
    });

    return (
      <Modal.Root>
        <Modal.Trigger class="flex items-center gap-2 px-4 py-2 bg-custom-primary-100 hover:bg-custom-primary-200 text-custom-primary-700 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md transform hover:-translate-y-0.5">
          <LuTag class="h-5 w-5 text-custom-primary-500" />
          Topics
        </Modal.Trigger>
        <Modal.Panel class="modal-panel absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-custom-neutral-0 rounded-3xl shadow-xl p-8 max-w-md">
          <div class="flex items-center justify-between mb-6">
            <Modal.Title class="text-2xl font-bold text-custom-primary-600">
              Edit Topics
            </Modal.Title>
            <Modal.Close class="p-2 hover:bg-custom-neutral-100 rounded-full transition-colors">
              <LuX class="h-5 w-5 text-custom-neutral-500" />
            </Modal.Close>
          </div>

          <Modal.Description class="text-custom-neutral-600 mb-6">
            You can update repository topics here. Hit the save button when
            finished.
          </Modal.Description>

          <div class="space-y-4 mb-8">
            <Label class="block">
              <span class="block text-custom-neutral-700 font-medium mb-2">
                Current Topics
              </span>
              <div class="flex flex-wrap gap-2 mb-4">
                {localTopics.value.map((topic) => (
                  <TopicPill topic={topic} onRemove$={removeTopic} />
                ))}
              </div>
              <input
                bind:value={topicInput}
                type="text"
                placeholder="Add topics (comma separated)"
                class="w-full p-3 border border-custom-neutral-200 rounded-xl focus:ring-2 focus:ring-custom-primary-400 focus:border-custom-primary-400 outline-none transition-all"
              />
            </Label>
          </div>

          <footer class="flex justify-end gap-3 pt-4 border-t border-custom-neutral-200">
            <Modal.Close class="transition-all duration-300 ease-in-out px-4 py-2 bg-custom-neutral-100 hover:bg-custom-neutral-200 text-custom-neutral-700 rounded-lg transition-colors cursor-pointer border border-custom-neutral-200 hover:shadow-md transform hover:-translate-y-0.5">
              Cancel
            </Modal.Close>
            <Modal.Close
              onClick$={onSave}
              class="transition-all duration-300 ease-in-out px-4 py-2 bg-custom-primary-600 hover:bg-custom-primary-700 text-custom-neutral-700 rounded-lg transition-colors cursor-pointer border border-custom-neutral-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              Save Changes
            </Modal.Close>
          </footer>
        </Modal.Panel>
      </Modal.Root>
    );
  }
);
