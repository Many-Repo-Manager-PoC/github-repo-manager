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
        <Modal.Trigger class="flex items-center gap-2 px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-lg shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-purple-500/30 hover:-translate-y-0.5">
          <LuTag class="h-5 w-5" />
          Topics
        </Modal.Trigger>
        <Modal.Panel class="modal-panel absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <Modal.Title class="text-2xl font-bold text-purple-400">
              Edit Topics
            </Modal.Title>
            <Modal.Close class="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white">
              <LuX class="h-5 w-5" />
            </Modal.Close>
          </div>

          <Modal.Description class="text-gray-300 mb-6">
            You can update repository topics here. Hit the save button when
            finished.
          </Modal.Description>

          <div class="space-y-4 mb-8">
            <Label class="block">
              <span class="block text-gray-200 font-medium mb-2">
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
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-200 placeholder-gray-500"
              />
            </Label>
          </div>

          <footer class="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Modal.Close class="transition-all duration-300 ease-in-out px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg cursor-pointer border border-gray-600 hover:shadow-lg">
              Cancel
            </Modal.Close>
            <Modal.Close
              onClick$={onSave}
              class="transition-all duration-300 ease-in-out px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg cursor-pointer hover:shadow-purple-500/30"
            >
              Save Changes
            </Modal.Close>
          </footer>
        </Modal.Panel>
      </Modal.Root>
    );
  }
);
