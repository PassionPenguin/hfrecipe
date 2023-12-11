'use client'

import React, {useState} from "react";
import MarkdownPreview from "@/components/ui/markdown";

enum EditorMode {
    previewOnly,
    sourceOnly,
    default
}

export default function MarkdownEditor(props: { source: string, id: string, title?: string, hint?: string }) {
    const [mode, setMode] = useState<EditorMode>();
    const [source, setSource] = useState<string>(props.source);
    let body: React.ReactElement, preview: React.ReactElement, editor: React.ReactElement;

    preview = <div className="flex-1 px-8 py-2">
        <MarkdownPreview source={source}/>
    </div>
    editor = <div className="flex-1 px-4 py-2 flex flex-col">
        <textarea className="bg-transparent w-full min-h-[400px] outline-none flex-grow shrink-0 basis-auto"
                  onChange={(e) => setSource(e.target.value)} value={source}>
        </textarea>
    </div>

    if (mode === EditorMode.previewOnly) {
        body = preview;
    } else if (mode === EditorMode.sourceOnly) {
        body = editor;
    } else {
        body = <>{editor}
            <div className="w-[2px] bg-slate-300 dark:bg-slate-700"></div>
            {preview}</>
    }

    return <div>
        <input type="hidden" name={props.id} value={source}/>
        <div className="flex items-center justify-between mb-2">
            <label
                htmlFor={props.id}
                className="block text-sm font-medium leading-6"
            >
                {props.title}
            </label>
            <div className="text-sm">{props.hint}</div>
        </div>
        <div
            className="flex flex-row bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 rounded dark:border-slate-600">
            {body}
        </div>
    </div>
}