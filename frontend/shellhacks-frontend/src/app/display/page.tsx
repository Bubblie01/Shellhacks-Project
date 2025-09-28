// app/display/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../Componets/navbar";

type AnyObj = Record<string, any>;

const extractTexts = (data: any): string[] =>
  (Array.isArray(data) ? data : [data])
    .flatMap((item: AnyObj) => item?.content?.parts ?? [])
    .map((part: AnyObj) => part?.text)
    .filter(Boolean);

export default function DisplayPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [typing, setTyping] = useState<string>("");
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

  // typewriter for a single message
  const typeOut = (full: string, ms = 12) =>
    new Promise<void>((resolve) => {
      setTyping("");
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyping(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(id);
          setMessages((prev) => [...prev, full]);
          setTyping("");
          resolve();
        }
      }, ms);
    });

  // call backend and reveal each returned entry sequentially
  const sendMessage = async (text: string) => {
    setSending(true);

    // show the user's own message immediately (optional chat feel)
    setMessages((prev) => [...prev, `**You:** ${text}`]);

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
        // swallow UI error (per your request), just stop typing and log
        console.error("Request failed:", res.status, res.statusText);
        return;
      }

      const data = await res.json();
      const texts = extractTexts(data);

      for (const entry of texts) {
        await typeOut(entry);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  // submit from composer
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
              <div key={i} className="p-4 rounded-xl bg-[#2f4fd4] whitespace-pre-wrap">
                {m}
              </div>
            ))}

            {typing && (
              <div className="p-4 rounded-xl bg-[#2f4fd4] whitespace-pre-wrap">
                {typing}
                <span className="animate-pulse">▌</span>
              </div>
            )}
          </div>

          {/* composer (same idea as on /home) */}
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
