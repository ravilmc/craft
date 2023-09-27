import { cn, getUrlFromString } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check, Trash } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <div className="craft-relative">
      <button
        type="button"
        className="craft-flex craft-h-full craft-items-center craft-space-x-2 craft-px-3 craft-py-1.5 craft-text-sm craft-font-medium craft-text-stone-600 hover:craft-bg-stone-100 active:craft-bg-stone-200"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="craft-text-base">↗</p>
        <p
          className={cn(
            "craft-underline craft-decoration-stone-400 craft-underline-offset-4",
            {
              "craft-text-blue-500": editor.isActive("link"),
            }
          )}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
            setIsOpen(false);
          }}
          className="craft-fixed craft-top-full craft-z-[99999] craft-mt-1 craft-flex craft-w-60 craft-overflow-hidden craft-rounded craft-border craft-border-stone-200 craft-bg-white craft-p-1 craft-shadow-xl craft-animate-in craft-fade-in craft-slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="craft-flex-1 craft-bg-white craft-p-1 craft-text-sm craft-outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="craft-flex craft-items-center craft-rounded-sm craft-p-1 craft-text-red-600 craft-transition-all hover:craft-bg-red-100 dark:hover:craft-bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className="craft-h-4 craft-w-4" />
            </button>
          ) : (
            <button className="craft-flex craft-items-center craft-rounded-sm craft-p-1 craft-text-stone-600 craft-transition-all hover:craft-bg-stone-100">
              <Check className="craft-h-4 craft-w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
