"use client";

import { useState } from "react";
import { CraftEditor } from "../../../packages/core/src/ui/editor/";
import { defaultEditorContent } from "@/lib/default-content";

export default function Editor() {
  const [content, setContent] = useState<any>(defaultEditorContent);

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg">
        <CraftEditor
          value={content}
          onUpdate={(editor) => setContent(editor.getJSON())}
        />
      </div>
    </div>
  );
}
