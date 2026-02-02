"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
};

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    onSendMessage,
    isLoading = false,
}) => {
    const [input, setInput] = React.useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput("");
        }
    };

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex gap-3 max-w-[90%]",
                                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                                        msg.role === "assistant"
                                            ? "bg-primary/10 border-primary/20 text-primary"
                                            : "bg-secondary border-transparent text-secondary-foreground"
                                    )}
                                >
                                    {msg.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
                                </div>
                                <div
                                    className={cn(
                                        "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                        msg.role === "assistant"
                                            ? "bg-card border border-border text-card-foreground"
                                            : "bg-primary text-primary-foreground"
                                    )}
                                >
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mr-auto flex max-w-[90%] gap-3"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                                <Sparkles size={18} className="animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
                                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                                <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card/50 p-4 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        className="flex-1 bg-background"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="md" disabled={!input.trim() || isLoading}>
                        <Send size={18} />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );
};
