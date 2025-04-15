import { component$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';
import { QRL } from '@builder.io/qwik';
interface SelectProps<T extends Record<string, unknown> = Record<string, string>> {
  options: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  label?: string;
  placeholder?: string;
  onChange: QRL<(value: string) => void>;
}

export const SelectList = component$(({ 
  options, 
  labelKey, 
  valueKey, 
  label = 'Select an option',
  placeholder = 'Select an option',
  onChange
}: SelectProps) => {

  return (
    <div class="w-full max-w-xs">
      <Select.Root class="w-full" onChange$={onChange} value={options[0][valueKey]}>
        {label && (
          <Select.Label class="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </Select.Label>
        )}
        <Select.Trigger class="w-full cursor-pointer flex items-center justify-between px-4 py-2.5 bg-gray-700/50 text-gray-200 rounded-xl border border-gray-700 hover:border-purple-600/30 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50">
          <Select.DisplayValue 
            class="placeholder-gray-500"
          />
          <LuChevronDown class="w-4 h-4 text-gray-400" />
        </Select.Trigger>
        <Select.Popover class="w-full max-w-xs bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-1 mt-1 z-50">
          <div class="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {options.map((option) => (
              <Select.Item
                class="flex items-center px-4 py-2.5 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-700/60 transition-colors aria-selected:bg-purple-600/20 aria-selected:text-purple-300 outline-none"
                value={String(option[valueKey])} 
                key={String(option[valueKey])}
              >
                <div class="flex-1">
                  <Select.ItemLabel>{String(option[labelKey])}</Select.ItemLabel>
                </div>
                <Select.ItemIndicator class="ml-2 text-purple-400">
                  <LuCheck class="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </div>
        </Select.Popover>
      </Select.Root>
    </div>
  );
});

