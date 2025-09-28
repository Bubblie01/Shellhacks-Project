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

// Renders sanitized HTML safely
function HtmlBubble({ html }: { html: string }) {
  const safe = useMemo(
    () =>
      DOMPurify.sanitize(html, {
        ALLOWED_ATTR: ["href", "target", "rel"],
        ADD_ATTR: ["target", "rel"],
      }),
    [html]
  );

  return (
    <div
      className="p-4 rounded-xl bg-[#2f4fd4] whitespace-pre-wrap"
      // If you have @tailwindcss/typography installed, swap the class above for "prose prose-invert max-w-none p-4 rounded-xl bg-[#2f4fd4]"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export default function DisplayPage() {
  const [messages, setMessages] = useState<string[]>([]); // finished AI messages (HTML)
  const [typing, setTyping] = useState<string>("");       // currently typing (HTML)
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll as content grows
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // on first load, send the prompt saved from /home
  useEffect(() => {
    const initial = sessionStorage.getItem("agent_input") || "";
    if (initial.trim()) {
      setInputValue(""); // clear composer
      void sendMessage(initial.trim());
      sessionStorage.removeItem("agent_input");
    }
  }, []);

  // typewriter for a single HTML message
  const typeOut = (fullHtml: string, ms = 10) =>
    new Promise<void>((resolve) => {
      setTyping("");
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyping(fullHtml.slice(0, i)); // feed partial HTML; browser is forgiving
        if (i >= fullHtml.length) {
          clearInterval(id);
          setMessages((prev) => [...prev, fullHtml]);
          setTyping("");
          resolve();
        }
      }, ms);
    });

  // call backend and reveal each returned entry sequentially
  const sendMessage = async (text: string) => {
    setSending(true);

    // Show user's message as a bubble (escaped/sanitized as HTML)
    const userHtml = `<strong>You:</strong> ${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}`;
    setMessages((prev) => [...prev, userHtml]);

    try {
      const sessionId = sessionStorage.getItem("agent_session_id") || "temp_session_42";
      const username = sessionStorage.getItem("agent_username") || "temp_user_42";

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
        return;
      }

      const data = await res.json();
      const texts = extractTexts(data); // these are HTML-ish strings

      for (const entry of texts) {
        await typeOut(entry);
      }
    } catch (e) {
      console.error(e);
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

          {/* conversation area */}
          <div
            ref={containerRef}
            className="flex-1 rounded-2xl p-4 overflow-auto space-y-5 bg-[#394dd6]/30"
          >
            {messages.map((m, i) => (
              <HtmlBubble key={i} html={m} />
            ))}

            {typing && (
              <HtmlBubble html={typing + `<span class="animate-pulse">▌</span>`} />
            )}
          </div>

          {/* composer (respond to the AI) */}
          <div className="mt-4">
            <div className="flex justify-between text-sm opacity-90">
              <span>Character Limit: {inputValue.length}/250</span>
            </div>

            <textarea
              className="textarea bg-gray-200 w-full h-28 text-black mt-2"
              maxLength={250}
              placeholder="Type your follow-up for the AI… (Shift+Enter for newline, Enter to send)"
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
