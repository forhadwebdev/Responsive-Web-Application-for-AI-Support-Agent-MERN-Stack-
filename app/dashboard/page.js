"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import { apiFetch } from "@/lib/apiClient";

const StatCard = ({ label, value, sub }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [persona, setPersona] = useState("");
  const [savingPersona, setSavingPersona] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setCheckingAuth(false);

    const load = async () => {
      try {
        const [statsData, convData, meData] = await Promise.all([
          apiFetch("/dashboard/stats"),
          apiFetch("/chat/conversations"),
          apiFetch("/auth/me"),
        ]);
        setStats(statsData);
        setConversations(convData);
        setPersona(meData.botPersona);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    load();
  }, [router]);

  const savePersona = async () => {
    setSavingPersona(true);
    setSavedMsg("");
    try {
      await apiFetch("/chat/persona", {
        method: "PUT",
        body: JSON.stringify({ botPersona: persona }),
      });
      setSavedMsg("Saved ✓");
    } catch (err) {
      setSavedMsg("Failed to save");
    } finally {
      setSavingPersona(false);
      setTimeout(() => setSavedMsg(""), 2000);
    }
  };

  if (checkingAuth) return null;

  const chartData = conversations
    .slice(0, 7)
    .reverse()
    .map((c, i) => ({ name: `#${i + 1}`, messages: c.messages.length }));

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {stats && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Conversations" value={stats.totalConversations} />
            <StatCard label="Open" value={stats.openConversations} />
            <StatCard label="Escalated" value={stats.escalated} />
            <StatCard
              label="AI Replies Used"
              value={`${stats.messagesUsedThisMonth}/${stats.monthlyMessageLimit}`}
              sub={`Plan: ${stats.plan}`}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Conversation Activity</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="messages" fill="#3d5afe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-2">AI Agent Persona</h2>
            <p className="text-xs text-gray-500 mb-3">
              These instructions tell your AI how to respond to customers.
            </p>
            <textarea
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              rows={6}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={savePersona}
                disabled={savingPersona}
                className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
              >
                {savingPersona ? "Saving..." : "Save Persona"}
              </button>
              {savedMsg && <span className="text-sm text-gray-500">{savedMsg}</span>}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mt-6">
          <h2 className="font-semibold text-gray-900 mb-4">Conversations</h2>
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500">
              No conversations yet. Try the demo chat widget on the landing page.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {conversations.map((c) => (
                <div key={c._id} className="py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{c.customerName}</p>
                    <p className="text-gray-500">{c.messages.length} messages</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.status === "open"
                        ? "bg-green-50 text-green-600"
                        : c.status === "escalated"
                        ? "bg-red-50 text-red-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
