"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
    code: string;
    onChange: (value: string) => void;
    language?: string;
    className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    code,
    onChange,
    language = "javascript",
    className,
}) => {
    return (
        <div className={cn("relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-slate-950", className)}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-slate-900 px-4 py-2">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/20 ring-1 ring-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20 ring-1 ring-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/20 ring-1 ring-green-500/50" />
                    </div>
                    <span className="ml-2 text-xs font-medium text-slate-400">solution.{language === "javascript" ? "js" : "py"}</span>
                </div>
                <div className="text-xs text-slate-500">Auto-saved</div>
            </div>

            {/* Editor Area */}
            <div className="relative flex-1 font-mono text-sm leading-6">
                <textarea
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-full w-full resize-none border-0 bg-transparent p-4 text-slate-300 focus:ring-0 active:outline-none"
                    spellCheck={false}
                    placeholder="// Write your solution here..."
                />
                {/* Simple line number emulation left out for clean textarea UX in MVP */}
            </div>
        </div>
    );
};
