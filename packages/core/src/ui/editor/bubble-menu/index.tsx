import { BubbleMenu, BubbleMenuProps, isNodeSelection, useCurrentEditor } from "@tiptap/react";
import { FC, useState } from "react";
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon } from "lucide-react";
import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import { LinkSelector } from "./link-selector";
import { cn } from "@/lib/utils";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children" | "editor">;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const { editor } = useCurrentEditor();

  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => editor?.isActive("bold") ?? false,
      command: () => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => editor?.isActive("italic") ?? false,
      command: () => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => editor?.isActive("underline") ?? false,
      command: () => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: () => editor?.isActive("strike") ?? false,
      command: () => editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: () => editor?.isActive("code") ?? false,
      command: () => editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive("image") || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="craft-flex craft-w-fit craft-divide-x craft-divide-stone-200 craft-rounded craft-border craft-border-stone-200 craft-bg-white craft-shadow-xl"
    >
      <NodeSelector
        editor={editor!}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      />
      <LinkSelector
        editor={editor!}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => {
          setIsLinkSelectorOpen(!isLinkSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
        }}
      />
      <div className="craft-flex">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.command}
            className="craft-p-2 craft-text-stone-600 hover:craft-bg-stone-100 active:craft-bg-stone-200"
            type="button"
          >
            <item.icon
              className={cn("craft-h-4 craft-w-4", {
                "craft-text-blue-500": item.isActive(),
              })}
            />
          </button>
        ))}
      </div>
      <ColorSelector
        editor={editor!}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      />
    </BubbleMenu>
  );
};