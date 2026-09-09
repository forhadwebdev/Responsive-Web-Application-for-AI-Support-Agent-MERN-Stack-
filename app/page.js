import Link from "next/link";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

const features = [
  {
    title: "AI-Powered Replies",
    desc: "Instantly answer customer questions using your own business knowledge and tone, powered by OpenAI.",
  },
  {
    title: "Smart Escalation",
    desc: "The AI knows when it's unsure and flags the conversation for a human teammate to step in.",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track conversation volume, resolution rate, and usage against your plan in real time.",
  },
  {
    title: "Easy Embed",
    desc: "Drop one snippet on your website and your AI support agent is live in minutes.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold mb-4">
            AI-Integrated SaaS Demo Project
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Give every visitor a<br />
            <span className="text-brand-600">24/7 AI support agent.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            SupportPilot AI connects to your website and answers customer
            questions instantly — trained on your business, escalated to
            your team when it matters.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold"
            >
              Start Free Trial
            </Link>
            <a
              href="#demo"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              Try the Demo
            </a>
          </div>
        </div>

        <div id="demo" className="flex justify-center">
          <ChatWidget widgetId="demo-widget" />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Everything you need to automate support
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-5 rounded-xl border border-gray-100 hover:shadow-md transition">
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-400">
        Built with Next.js (full-stack) + MongoDB + OpenAI API — a portfolio demo project.
      </footer>
    </div>
  );
}
