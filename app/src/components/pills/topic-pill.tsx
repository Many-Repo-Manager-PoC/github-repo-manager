import { component$, QRL } from "@builder.io/qwik";
import { LuX } from "@qwikest/icons/lucide";
export interface TopicPillProps {
  topic: string;
  onRemove$: QRL<(topic: string) => void>;
}

export const TopicPill = component$<TopicPillProps>(({ topic, onRemove$ }) => {
  return (
    <div class="flex items-center gap-2 px-4 py-2 bg-custom-primary-100 hover:bg-custom-primary-200 text-custom-primary-700 rounded-lg shadow-sm  transition-all duration-300 ease-in-out hover:shadow-md transform hover:-translate-y-0.5">
      {topic}
      <button class="cursor-pointer" onClick$={() => onRemove$(topic)}>
        <LuX class="h-5 w-5 text-custom-neutral-500" />
      </button>
    </div>
  );
});
