"use client";

import { useState } from "react";
import {
    ChatContainerContent,
    ChatContainerRoot,
    ChatContainerScrollAnchor,
} from "./prompt-kit/chat-container";
import {
    Message,
    MessageAvatar,
    MessageContent,
} from "./prompt-kit/message";
import {
    PromptInput,
    PromptInputActions,
    PromptInputAction,
    PromptInputTextarea,
} from "./prompt-kit/prompt-input";
import { Button } from "./ui/button";
import { SendIcon, PaperclipIcon } from "lucide-react";

export function KnowledgeChat() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your Knowledge Vault assistant. How can I help you navigate our research today?",
        },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", content: inputValue },
            { role: "assistant", content: `I've received your query about "${inputValue}". I'm searching the vault sections for relevant documentation...` }
        ];

        setMessages(newMessages);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-background">
            <ChatContainerRoot className="flex-1 p-4">
                <ChatContainerContent>
                    {messages.map((msg, i) => (
                        <Message key={i} className={msg.role === "user" ? "flex-row-reverse" : ""}>
                            <MessageAvatar
                                src={msg.role === "assistant" ? "/favicon.svg" : "https://github.com/nutlope.png"}
                                alt={msg.role}
                                fallback={msg.role === "assistant" ? "AI" : "U"}
                            />
                            <MessageContent className={msg.role === "user" ? "bg-primary text-primary-foreground" : ""}>
                                {msg.content}
                            </MessageContent>
                        </Message>
                    ))}
                    <ChatContainerScrollAnchor />
                </ChatContainerContent>
            </ChatContainerRoot>

            <div className="p-4 border-t">
                <PromptInput
                    value={inputValue}
                    onValueChange={setInputValue}
                    onSubmit={handleSend}
                    className="max-w-3xl mx-auto"
                >
                    <PromptInputTextarea placeholder="Ask about the Knowledge Vault..." />
                    <PromptInputActions>
                        <PromptInputAction tooltip="Attach file">
                            <Button variant="ghost" size="icon" className="size-8">
                                <PaperclipIcon className="size-4" />
                            </Button>
                        </PromptInputAction>
                        <div className="flex-1" />
                        <Button
                            onClick={handleSend}
                            size="icon"
                            className="size-8 rounded-full"
                            disabled={!inputValue.trim()}
                        >
                            <SendIcon className="size-4" />
                        </Button>
                    </PromptInputActions>
                </PromptInput>
            </div>
        </div>
    );
}
