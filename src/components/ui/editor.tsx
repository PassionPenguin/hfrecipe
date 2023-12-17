"use client";

import MarkdownPreview from "@/components/ui/markdown";
import React, { useState } from "react";

enum EditorMode {
    previewOnly,
    sourceOnly,
    default
}

export default function MarkdownEditor(props: {
    source: string;
    id: string;
    title?: string;
    hint?: string;
}) {
    const [mode, setMode] = useState<EditorMode>();
    const [source, setSource] = useState<string>(props.source);
    let body: React.ReactElement,
        preview: React.ReactElement,
        editor: React.ReactElement;

    preview = (
        <div className="flex-1 px-8 py-2">
            <MarkdownPreview source={source} />
        </div>
    );
    editor = (
        <div className="flex flex-1 flex-col px-4 py-2">
            <textarea
                className="min-h-[400px] w-full shrink-0 flex-grow basis-auto bg-transparent outline-none"
                onChange={(e) => setSource(e.target.value)}
                value={source}
            ></textarea>
        </div>
    );

    if (mode === EditorMode.previewOnly) {
        body = preview;
    } else if (mode === EditorMode.sourceOnly) {
        body = editor;
    } else {
        body = (
            <>
                {editor}
                <div className="w-[2px] bg-slate-300 dark:bg-slate-700"></div>
                {preview}
            </>
        );
    }

    return (
        <div>
            <input type="hidden" name={props.id} value={source} />
            <div className="mb-2 flex items-center justify-between">
                <label
                    htmlFor={props.id}
                    className="block text-sm font-medium leading-6"
                >
                    {props.title}
                </label>
                <div className="text-sm">{props.hint}</div>
            </div>
            <div className="flex flex-row rounded border-2 border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
                {body}
            </div>
        </div>
    );
}
