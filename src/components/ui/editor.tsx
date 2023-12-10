'use client'

import React, {useState} from "react";
import MarkdownPreview from "@/components/ui/markdown";

enum EditorMode {
    previewOnly,
    sourceOnly,
    default
}

export default function MarkdownEditor(props: { source: string, id: string }) {
    const [mode, setMode] = useState<EditorMode>();
    const [source, setSource] = useState<string>(props.source);
    let body: React.ReactElement, preview: React.ReactElement, editor: React.ReactElement;

    preview = <div className="flex-1 px-4 py-2">
        <MarkdownPreview source={source}/>
    </div>
    editor = <div className="flex-1 px-4 py-2 flex flex-col">
        <textarea className="bg-transparent w-full min-h-[400px] outline-none flex-grow shrink-0 basis-auto" onChange={(e) => setSource(e.target.value)} value={source}>
        </textarea>
    </div>

    if (mode === EditorMode.previewOnly) {
        body = preview;
    } else if (mode === EditorMode.sourceOnly) {
        body = editor;
    } else {
        body = <>{editor}<div className="w-[2px] bg-slate-800 dark:bg-slate-500"></div>{preview}</>
    }

    return <div className="flex flex-row bg-slate-100 dark:bg-slate-700 border-2 border-slate-800 dark:border-slate-500">
        <input id={props.id} type="hidden" value={source}/>
        {body}
    </div>
}