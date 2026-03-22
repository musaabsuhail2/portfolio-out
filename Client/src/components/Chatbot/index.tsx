import { useState, useCallback, useRef } from "react";
import { AiChat, ResponseRenderer } from "@nlux/react";
import { useChatAdapter } from "@nlux/nlbridge-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MessageIcon,
  Cancel01Icon,
  Delete02Icon,
  MinusSignIcon,
  UserIcon,
  ThumbsUpIcon,
  FavouriteIcon,
  ThumbsDownIcon,
} from "@hugeicons/core-free-icons";
import "@nlux/themes/nova.css";

import { personaOptions } from "./personas";

const SESSION_ID = crypto.randomUUID();
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function persistMessage(role: "user" | "assistant", content: string) {
  try {
    await fetch(`${API_BASE}/api/chat/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: SESSION_ID, role, content }),
    });
  } catch (err) {
    console.error("Failed to persist message:", err);
  }
}

async function deleteHistory() {
  try {
    await fetch(`${API_BASE}/api/chat/history/${SESSION_ID}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Failed to delete history:", err);
  }
}

/* ─── Rating renderer ─────────────────────────────────────────────── */
const RatingRenderer: ResponseRenderer<string> = (props) => {
  const [rated, setRated] = useState<string | null>(null);

  const rate = useCallback((key: string) => {
    setRated(key);
    console.log(`Rated: ${key}`);
  }, []);

  const ratings = [
    { key: "like", icon: ThumbsUpIcon, label: "Like" },
    { key: "love", icon: FavouriteIcon, label: "Love" },
    { key: "dislike", icon: ThumbsDownIcon, label: "Dislike" },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm leading-relaxed text-slate-200">{props.content}</p>

      <div className="flex items-center gap-1 pt-1">
        {ratings.map(({ key, icon, label }) => {
          const active = rated === key;
          return (
            <button
              key={key}
              aria-label={label}
              disabled={!!rated}
              onClick={() => rate(key)}
              className={`
                flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-150
                ${
                  active
                    ? "border-indigo-400 bg-indigo-500/20 text-indigo-300 scale-110"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-indigo-400/60 hover:text-indigo-300 hover:scale-105"
                }
                disabled:cursor-default disabled:opacity-60
              `}
            >
              <HugeiconsIcon
                icon={icon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Chatbot ─────────────────────────────────────────────────────── */
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const remountKey = useRef(0);

  const adapter = useChatAdapter({ url: `${API_BASE}/api/chat/message` });

  const handleMessageSent = useCallback(
    (m: any) => persistMessage("user", m),
    [],
  );
  const handleMessageReceived = useCallback(
    (m: any) => persistMessage("assistant", m),
    [],
  );

  return (
    <>
      {/* ── FAB ── */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((v) => !v)}
        className={`
          fixed bottom-6 right-6 z-50
         
          flex items-center justify-center
          shadow-xl transition-all duration-300
          ${
            isOpen
              ? ""
              : " w-14 h-14 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 hover:scale-110"
          }
        `}
      >
        {/* ping ring — only when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 animate-ping pointer-events-none" />
        )}

        {/* icon swap */}
        <span
          className={`
            absolute transition-all duration-200
            ${isOpen ? "opacity-100 scale-100" : ""}
          `}
        >
          {/* <HugeiconsIcon
            icon={Cancel01Icon}
            size={22}
            color="#fff"
            strokeWidth={2}
          /> */}
        </span>
        <span
          className={`
            absolute transition-all duration-200
            ${isOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"}
          `}
        >
          <HugeiconsIcon
            icon={MessageIcon}
            size={22}
            color="#fff"
            strokeWidth={2}
          />
        </span>
      </button>

      {/* ── Panel ── */}
      <div
        className={`
          fixed bottom-6 right-6 z-40
          w-90 h-125
          flex flex-col
          rounded-2xl overflow-hidden
          border border-white/10
          bg-[#0e1118]
          shadow-[0_24px_60px_rgba(0,0,0,0.6)]
          transition-all duration-300 origin-bottom-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }
        `}
        role="dialog"
        aria-label="AI Chat"
      >
        {/* ── Header ── */}
        <div className="relative flex items-center justify-between px-4 py-3 bg-[#131825] border-b border-white/[0.07] shrink-0">
          {/* gradient accent line */}
          <span className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-indigo-500 to-violet-500 opacity-60" />

          <div className="flex items-center gap-3">
            {/* avatar */}
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center ring-2 ring-indigo-500/25 shrink-0">
              <HugeiconsIcon
                icon={UserIcon}
                size={17}
                color="#fff"
                strokeWidth={1.8}
              />
            </div>

            <div className="flex flex-col leading-none gap-0.75">
              <span className="text-[13.5px] font-semibold text-white tracking-wide">
                AI Assistant
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.7)] animate-pulse" />
                Online
              </span>
            </div>
          </div>

          {/* header actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Minimize"
              title="Minimize"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
            >
              <HugeiconsIcon
                icon={MinusSignIcon}
                size={16}
                color="currentColor"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-hidden relative bg-[#111520]">
          {/* subtle dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative h-full z-10">
            {isOpen && (
              <AiChat
                key={remountKey.current}
                messageOptions={{ responseRenderer: RatingRenderer }}
                adapter={adapter}
                personaOptions={personaOptions}
                displayOptions={{ colorScheme: "dark" }}
                conversationOptions={{ layout: "list" }}
                events={{
                  messageSent: handleMessageSent,
                  messageReceived: handleMessageReceived,
                }}
              />
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 flex items-center justify-center gap-1 h-8 bg-[#0e1118] border-t border-white/5">
          <span className="text-[10.5px] text-slate-500 tracking-wide">
            Powered by{" "}
            <span className="text-indigo-400 font-medium">OpenAI</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
export { Chatbot };
