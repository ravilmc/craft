import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import * as Popover from "@radix-ui/react-popover";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--craft-black)",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--craft-highlight-default)",
  },
  {
    name: "Purple",
    color: "var(--craft-highlight-purple)",
  },
  {
    name: "Red",
    color: "var(--craft-highlight-red)",
  },
  {
    name: "Yellow",
    color: "var(--craft-highlight-yellow)",
  },
  {
    name: "Blue",
    color: "var(--craft-highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--craft-highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--craft-highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--craft-highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--craft-highlight-gray)",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover.Root open={isOpen}>
      <div className="craft-relative craft-h-full">
        <Popover.Trigger
          className="craft-flex craft-h-full craft-items-center craft-gap-1 craft-p-2 craft-text-sm craft-font-medium craft-text-stone-600 hover:craft-bg-stone-100 active:craft-bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className="craft-rounded-sm craft-px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>

          <ChevronDown className="craft-h-4 craft-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="craft-z-[99999] craft-my-1 craft-flex craft-max-h-80 craft-w-48 craft-flex-col craft-overflow-hidden craft-overflow-y-auto craft-rounded craft-border craft-border-stone-200 craft-bg-white craft-p-1 craft-shadow-xl craft-animate-in craft-fade-in craft-slide-in-from-top-1"
        >
          <div className="craft-my-1 craft-px-2 craft-text-sm craft-text-stone-500">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                setIsOpen(false);
              }}
              className="craft-flex craft-items-center craft-justify-between craft-rounded-sm craft-px-2 craft-py-1 craft-text-sm craft-text-stone-600 hover:craft-bg-stone-100"
              type="button"
            >
              <div className="craft-flex craft-items-center craft-space-x-2">
                <div
                  className="craft-rounded-sm craft-border craft-border-stone-200 craft-px-1 craft-py-px craft-font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="craft-h-4 craft-w-4" />
              )}
            </button>
          ))}

          <div className="craft-mb-1 craft-mt-2 craft-px-2 craft-text-sm craft-text-stone-500">
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className="craft-flex craft-items-center craft-justify-between craft-rounded-sm craft-px-2 craft-py-1 craft-text-sm craft-text-stone-600 hover:craft-bg-stone-100"
              type="button"
            >
              <div className="craft-flex craft-items-center craft-space-x-2">
                <div
                  className="craft-rounded-sm craft-border craft-border-stone-200 craft-px-1 craft-py-px craft-font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="craft-h-4 craft-w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
