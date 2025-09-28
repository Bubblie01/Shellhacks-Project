// app/display/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../Componets/navbar";
import DOMPurify from "dompurify";
import { jsPDF } from "jspdf";
import Particles, {initParticlesEngine} from '@tsparticles/react'
import { Container } from "@tsparticles/engine";
import { loadStarsPreset } from '@tsparticles/preset-stars'
import { Background } from "tsparticles-engine";
import BackgroundParticles from "../Componets/BackgroundParticles";
import { marked } from 'marked';

type AnyObj = Record<string, any>;

const extractTexts = (data: any): string[] =>
  (Array.isArray(data) ? data : [data])
    .flatMap((item: AnyObj) => item?.content?.parts ?? [])
    .map((part: AnyObj) => part?.text)
    .filter(Boolean);

function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class"],
    ADD_ATTR: ["target", "rel"],
  });
}

function renderMarkdown(text: string): string {
  // Configure marked options
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // Enable GitHub Flavored Markdown
  });
  
  return marked.parse(text) as string;
}

// Chat bubble
function MessageBubble({ text, isUser, isMarkdown = false }: { 
  text: string; 
  isUser: boolean; 
  isMarkdown?: boolean;
}) {
  const processedHtml = useMemo(() => {
    if (isUser) {
      // For user messages, just escape HTML
      return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else {
      // For AI messages, render markdown then sanitize
      const markdownHtml = isMarkdown ? renderMarkdown(text) : text;
      return sanitizeHtml(markdownHtml);
    }
  }, [text, isUser, isMarkdown]);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[75%] p-4 rounded-2xl text-sm leading-snug
          ${isUser 
            ? "bg-[#7765E3] text-white rounded-br-none whitespace-pre-wrap" 
            : "bg-[#2f4fd4] text-white rounded-bl-none prose prose-invert prose-sm max-w-none"
          }
        `}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
}

// Typing dots bubble
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center space-x-1 rounded-2xl rounded-bl-none bg-[#2f4fd4] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white opacity-80 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-white opacity-80 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-white opacity-80 animate-bounce" />
      </div>
    </div>
  );
}

export default function DisplayPage() {
  const [messages, setMessages] = useState<
    { text: string; isUser: boolean }[]
  >([]);
  const [typing, setTyping] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, loading]);

  // send initial saved input
  useEffect(() => {
    const initial = sessionStorage.getItem("agent_input") || "";
    if (initial.trim()) {
      setInputValue("");
      void sendMessage(initial.trim());
      sessionStorage.removeItem("agent_input");
    }
  }, []);

  // typewriter effect
  const typeOut = (fullText: string, ms = 10) =>
    new Promise<void>((resolve) => {
      setTyping("");
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyping(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(id);
          setMessages((prev) => [...prev, { text: fullText, isUser: false }]);
          setTyping("");
          resolve();
        }
      }, ms);
    });

  const sendMessage = async (text: string) => {
    setSending(true);

    setMessages((prev) => [...prev, { text, isUser: true }]);

    try {
      const sessionId =
        sessionStorage.getItem("agent_session_id") || "temp_session_42";
      const username =
        sessionStorage.getItem("agent_username") || "temp_user_42";

      setLoading(true);

      const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_name: "base_agent",
          user_id: username,
          session_id: sessionId,
          new_message: { role: "user", parts: [{ text }] },
        }),
      });

      if (!res.ok) {
        console.error("Request failed:", res.status, res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const texts = extractTexts(data);

      setLoading(false);

      for (const entry of texts) {
        await typeOut(entry);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setSending(false);
    }
  };

  // composer
  const onSendClick = () => {
    const t = inputValue.trim();
    if (!t) return;
    setInputValue("");
    void sendMessage(t);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendClick();
    }
  };

  // export last AI message as PDF
  const exportItinerary = () => {
    const lastAiMessage = [...messages].reverse().find((m) => !m.isUser);
    if (!lastAiMessage) {
      alert("No itinerary to export yet!");
      return;
    }

    // Convert markdown to HTML, then strip HTML tags for plain text
    const htmlContent = renderMarkdown(lastAiMessage.text);
    const plainText = htmlContent.replace(/<[^>]+>/g, "");

    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Wrap text to fit
    const lines = doc.splitTextToSize(plainText, 180);
    doc.text(lines, 10, 20);

    doc.save("itinerary.pdf");
  };

  return (
    <>
    <BackgroundParticles />
    <div className="h-screen w-screen bg-[#0a014fc3] text-white">
      <Navbar />
      <div className="fade-in2 mx-[8%] my-[8%] bg-[#3B60E4] h-[75%] w-[84%] rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-[5%] py-[5%] h-full flex flex-col">
          <h4 className="font-bold text-4xl mb-6">Your Itinerary:</h4>

          {/* chat area */}
          <div
            ref={containerRef}
            className="flex-1 rounded-2xl p-4 overflow-auto space-y-4 bg-[#394dd6]/30"
          >
            {messages.map((m, i) => (
              <MessageBubble 
                key={i} 
                text={m.text} 
                isUser={m.isUser} 
                isMarkdown={!m.isUser} 
              />
            ))}

            {loading && <TypingIndicator />}

            {typing && (
              <MessageBubble
                text={typing + "▌"}
                isUser={false}
                isMarkdown={true}
              />
            )}
          </div>

          {/* composer */}
          <div className="mt-4">
            <div className="flex justify-between text-sm opacity-90">
              <span>Character Limit: {inputValue.length}/250</span>
              <span className="hidden sm:inline">
                Shift+Enter for newline • Enter to send
              </span>
            </div>

            <textarea
              className="textarea bg-gray-200 w-full h-24 text-black mt-2 resize-none rounded-xl"
              maxLength={250}
              placeholder="Type your follow-up for the AI…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDown}
            />

            <div className="flex justify-between mt-3">
              <button
                className="btn btn-outline"
                onClick={exportItinerary}
                disabled={!messages.some((m) => !m.isUser)}
              >
                Export Itinerary
              </button>
              <button
                className="btn btn-success"
                onClick={onSendClick}
                disabled={sending || !inputValue.trim()}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}