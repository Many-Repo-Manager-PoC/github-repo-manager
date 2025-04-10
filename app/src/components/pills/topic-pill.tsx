import { component$, QRL } from "@builder.io/qwik";
import { LuX } from "@qwikest/icons/lucide";
export interface TopicPillProps {
  topic: string;
  onRemove$: QRL<(topic: string) => void>;
}

export const TopicPill = component$<TopicPillProps>(({ topic, onRemove$ }) => {
  return (
    <div class="flex items-center gap-2 px-4 py-2 bg-purple-900/50 text-purple-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-purple-500/20 transform hover:-translate-y-0.5 border border-purple-800">
      {topic}
      <button class="cursor-pointer" onClick$={() => onRemove$(topic)}>
        <LuX class="h-5 w-5 text-gray-400 hover:text-white" />
      </button>
    </div>
  );
});
