"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import { Send, Sparkles, User, ArrowRight } from "lucide-react";
import Markdown from "@/components/ui/Markdown";

interface Message {
  id: string;
  sender: "user" | "sage";
  text: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Who is the one asking?",
  "Explain Maharaj's teachings in 'I Am That'",
  "What is the core message of the Ashtavakra Gita?",
  "What is Chalmers' Hard Problem of consciousness?",
];

function SageClient() {
  const searchParams = useSearchParams();
  const queryParam = searchParams ? searchParams.get("query") || "" : "";
  const initialTriggered = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "sage",
      text: "I am the Sage of the Tree. I speak from the depths of Sri Nisargadatta Maharaj's non-dual realization and the timeless freedom of the Ashtavakra Gita. What is it that inquires within you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/sage/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error("Dialogue connection failed.");
      }

      const data = await res.json();

      const sageMsg: Message = {
        id: `sage-${Date.now()}`,
        sender: "sage",
        text: data.text || "Silence is the ultimate answer.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, sageMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        sender: "sage",
        text: "The connection to the Sage was interrupted. Sit in silence, or try re-establishing the dialogue.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (queryParam && !initialTriggered.current) {
      initialTriggered.current = true;
      handleSend(queryParam);
    }
  }, [queryParam]);

  return (
    <main
      className="relative flex flex-col h-screen overflow-hidden text-gold-light"
      style={{ backgroundColor: "#05060b" }}
    >
      <StarField blur />
      <Header />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-24 pb-6 w-full flex-1 flex flex-col min-h-0">
        {/* Top title bar */}
        <div className="flex items-center gap-3 border-b pb-3 mb-4 border-gold-matte/10">
          <div className="w-10 h-10 rounded-full border border-gold-matte/20 flex items-center justify-center bg-gold-matte/5">
            <Sparkles className="w-4 h-4 text-gold-bright animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif text-lg text-gold-bright">Sage Dialogue</h1>
            <span className="text-[9px] uppercase tracking-wider font-mono text-gold-matte/45 block">
              Contemplative Chatbot Interface
            </span>
          </div>
        </div>

        {/* Message Panel */}
        <div className="flex-1 overflow-y-auto px-2 py-4 mb-4 rounded-2xl border bg-cosmic-deep/30 border-gold-matte/10 flex flex-col gap-4 min-h-0 scrollbar-thin">
          {messages.map((msg) => {
            const isSage = msg.sender === "sage";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[82%] animate-fade-in ${isSage ? "self-start" : "self-end flex-row-reverse"
                  }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${isSage
                    ? "border-gold-matte/20 bg-gold-matte/5 text-gold-bright"
                    : "border-blue-500/20 bg-blue-500/5 text-blue-400"
                    }`}
                >
                  {isSage ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed font-light border ${isSage
                    ? "bg-[#0c0e18]/80 border-gold-matte/10 text-gold-light"
                    : "bg-cosmic-deep/90 border-blue-500/20 text-blue-50/95"
                    }`}
                >
                  {isSage ? (
                    <Markdown content={msg.text} />
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 self-start max-w-[80%]">
              <div className="w-7 h-7 rounded-full border border-gold-matte/20 flex items-center justify-center bg-gold-matte/5 text-gold-bright shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-[#0c0e18]/80 border border-gold-matte/10 text-gold-matte/60 text-[10px] tracking-wider uppercase font-mono animate-pulse">
                The Sage is contemplating...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sug)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-[10px] tracking-wider transition-all duration-300 cursor-pointer border-gold-matte/20 bg-gold-matte/2 hover:border-gold-bright hover:bg-gold-matte/5 text-gold-light"
              >
                <span>{sug}</span>
                <ArrowRight className="w-3 h-3 text-gold-matte/50" />
              </button>
            ))}
          </div>
        )}

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask the Sage a question about consciousness or self-inquiry..."
            className="flex-1 px-5 py-3 rounded-full border text-xs outline-none bg-[#0a0d1a]/85 border-gold-matte/20 text-gold-light placeholder-gold-matte/30 focus:border-gold-matte disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="p-3 border rounded-full transition-all cursor-pointer border-gold-matte/30 bg-gold-matte/5 text-gold-bright hover:bg-gold-matte/10 hover:border-gold-bright disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  );
}

export default function SagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05060b] flex items-center justify-center text-gold-matte font-serif tracking-widest text-xs animate-pulse">
          TUNING SAGE DIALOGUE...
        </div>
      }
    >
      <SageClient />
    </Suspense>
  );
}
