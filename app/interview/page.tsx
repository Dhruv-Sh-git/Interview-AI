"use client";

import React, { useState, useEffect } from "react";
import { ChatInterface, Message } from "@/components/interview/ChatInterface";
import { CodeEditor } from "@/components/interview/CodeEditor";
import { interviewAgent } from "@/lib/agents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function InterviewPage() {
    const [stage, setStage] = useState<"setup" | "interview">("setup");
    const [messages, setMessages] = useState<Message[]>([]);
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    useEffect(() => {
        // Start interview only after setup is done
        const initInterview = async () => {
            setIsLoading(true);
            const welcomeMsg = await interviewAgent.startInterview();
            setMessages([welcomeMsg]);
            setIsLoading(false);
            setHasStarted(true);
        };

        if (stage === "interview" && !hasStarted) {
            initInterview();
        }
    }, [stage, hasStarted]);

    const handleSendMessage = async (text: string) => {
        // Add user message immediately
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Get agent response
            const response = await interviewAgent.processResponse(text);
            setMessages((prev) => [...prev, response]);
        } catch (error) {
            console.error("Agent Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    if (stage === "setup") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Setup Interview</h1>
                        <p className="mt-2 text-muted-foreground">Upload your resume to generate a personalized interview.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex w-full items-center justify-center">
                            <label htmlFor="resume-upload" className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/20 hover:bg-secondary/40">
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                                    <span className="mb-2 text-sm font-semibold text-muted-foreground">
                                        {resumeFile ? resumeFile.name : "Click to upload Resume (PDF/DOCX)"}
                                    </span>
                                </div>
                                <input id="resume-upload" type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.docx,.txt" />
                            </label>
                        </div>

                        <Button
                            size="lg"
                            className="w-full"
                            disabled={!resumeFile}
                            onClick={() => setStage("interview")}
                        >
                            Start Interview
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full" onClick={() => setStage("interview")}>
                            Continue without Resume (Demo Mode)
                        </Button>

                        <div className="mt-4 text-center">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col bg-background font-sans text-foreground">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Exit
                        </Button>
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold leading-none">Senior Frontend Engineer</h1>
                        {resumeFile && <span className="text-xs text-muted-foreground">Resume: {resumeFile.name}</span>}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 ring-1 ring-green-500/20">
                        Live
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">
                {/* Chat Section */}
                <section className="flex w-[40%] min-w-[350px] flex-col border-r border-border bg-secondary/30 p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-medium text-muted-foreground">Interviewer</h2>
                    </div>
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                </section>

                {/* Code/Work Section */}
                <section className="flex flex-1 flex-col p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-medium text-muted-foreground">Workspace</h2>
                        <div className="flex gap-2">
                            {/* Controls like Run Code could go here */}
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                                Reset
                            </Button>
                            <Button size="sm" className="h-8 text-xs">
                                Run Code
                            </Button>
                        </div>
                    </div>
                    <CodeEditor
                        code={code}
                        onChange={setCode}
                        language="javascript"
                    />
                </section>
            </main>
        </div>
    );
}
