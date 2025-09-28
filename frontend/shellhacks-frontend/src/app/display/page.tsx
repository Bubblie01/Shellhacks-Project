// app/display/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../Componets/navbar";
import DOMPurify from "dompurify";

type AnyObj = Record<string, any>;

const extractTexts = (data: any): string[] =>
  (Array.isArray(data) ? data : [data])
    .flatMap((item: AnyObj) => item?.content?.parts ?? [])
    .map((part: AnyObj) => part?.text)
    .filter(Boolean);

// Sanitize HTML
function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_ATTR: ["href", "target", "rel"],
    ADD_ATTR: ["target", "rel"],
  });
}

// Speech bubble
function MessageBubble({
  html,
  isUser,
}: {
  html: string;
  isUser: boolean;
}) {
  const safe = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[75%] p-4 rounded-2xl text-sm leading-snug whitespace-pre-wrap
          ${isUser ? "bg-[#7765E3] text-white rounded-br-none" : "bg-[#2f4fd4] text-white rounded-bl-none"}
        `}
        dangerouslySetInnerHTML={{ __html: safe }}
      />
      {/* Tail */}
      <div
        className={`absolute ${
          isUser
            ? "right-0 translate-x-1 translate-y-[10px] border-t-8 border-t-[#7765E3] border-l-8 border-l-transparent"
            : "left-0 -translate-x-1 translate-y-[10px] border-t-8 border-t-[#2f4fd4] border-r-8 border-r-transparent"
        }`}
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
    { html: string; isUser: boolean }[]
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
  const typeOut = (fullHtml: string, ms = 10) =>
    new Promise<void>((resolve) => {
      setTyping("");
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyping(fullHtml.slice(0, i));
        if (i >= fullHtml.length) {
          clearInterval(id);
          setMessages((prev) => [...prev, { html: fullHtml, isUser: false }]);
          setTyping("");
          resolve();
        }
      }, ms);
    });

  const sendMessage = async (text: string) => {
    setSending(true);

    const userHtml = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    setMessages((prev) => [...prev, { html: userHtml, isUser: true }]);

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

  return (
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
              <MessageBubble key={i} html={m.html} isUser={m.isUser} />
            ))}

            {loading && <TypingIndicator />}

            {typing && (
              <MessageBubble
                html={typing + `<span class="animate-pulse">▌</span>`}
                isUser={false}
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

            <div className="flex justify-end mt-3">
              <button
                className="btn btn-success btn-md"
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
  );
}
