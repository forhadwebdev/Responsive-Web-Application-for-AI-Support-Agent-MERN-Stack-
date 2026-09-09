"use client";

import { useState, useRef, useEffect } from "react";

const ChatWidget = ({ widgetId }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const customerMessage = input;
    setMessages((prev) => [...prev, { sender: "customer", text: customerMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/chat/widget/${widgetId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, customerMessage }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setConversationId(data.conversationId);
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I ran into an issue reaching support. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl shadow-lg border border-gray-100 bg-white flex flex-col h-[480px]">
      <div className="bg-brand-500 text-white px-4 py-3 rounded-t-2xl font-semibold text-sm">
        💬 Support Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
              m.sender === "customer"
                ? "ml-auto bg-brand-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 text-gray-500 text-sm px-3 py-2 rounded-xl w-fit">
            Typing...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-gray-100 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={sendMessage}
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
