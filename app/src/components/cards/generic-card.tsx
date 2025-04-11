import { component$, Slot } from "@builder.io/qwik";

interface GenericCardProps {
  classNames?: string;
}

export const GenericCard = component$<GenericCardProps>(({ classNames = "" }) => {
  const baseClasses = "bg-gray-800 rounded-3xl border border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out";
  const combinedClasses = `${baseClasses} ${classNames}`;

  return (
    <div class={combinedClasses}>
      <div class="flex flex-col h-full">
        {/* Header slot */}
        <div class="mb-4">
          <Slot name="header" />
        </div>
        
        {/* Body slot */}
        <div class="flex-grow">
          <Slot name="body" />
        </div>
        
        {/* Optional footer slot */}
        <Slot name="footer" />
      </div>
    </div>
  );
});
