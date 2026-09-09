# SupportPilot AI — Next.js Full-Stack Version

The same AI-powered customer support SaaS, rebuilt as a **single Next.js
app** — frontend pages and backend API routes live in one codebase, one
`npm install`, and one deployment (ideal for Vercel).

Built as a portfolio project to demonstrate: Next.js App Router,
API routes as a backend, MongoDB/Mongoose, JWT auth, OpenAI API
integration, and SaaS-style usage limits.

---

## Tech Stack

**Framework:** Next.js 14 (App Router) — React + API routes together
**Database:** MongoDB (Mongoose)
**Auth:** JWT (jsonwebtoken + bcryptjs)
**AI:** OpenAI API (gpt-4o-mini)
**Styling:** Tailwind CSS
**Charts:** Recharts

---

## Why This Is Simpler Than the Separate MERN Version

- ✅ One `npm install`, one `.env`, one `npm run dev`
- ✅ One deployment target (Vercel) — no separate frontend/backend hosting
- ✅ No CORS configuration needed (frontend and API share the same origin)
- ✅ API routes live right next to the pages that use them

---

## Project Structure

```
next-support-saas/
├── app/
│   ├── page.js                          → Landing page
│   ├── login/page.js
│   ├── signup/page.js
│   ├── dashboard/page.js
│   └── api/
│       ├── auth/{signup,login,me}/route.js
│       ├── chat/widget/[widgetId]/message/route.js
│       ├── chat/conversations/route.js
│       ├── chat/conversations/[id]/route.js
│       ├── chat/persona/route.js
│       └── dashboard/stats/route.js
├── components/ (Navbar, ChatWidget)
├── lib/ (db.js, auth.js, apiClient.js)
├── models/ (User.js, Conversation.js)
└── utils/openai.js
```

---

## Running Locally

```bash
npm install
cp .env.example .env
# Fill in MONGO_URI (MongoDB Atlas), JWT_SECRET, OPENAI_API_KEY
npm run dev
```

Visit `http://localhost:3000`.

---

## Deployment (Vercel — recommended)

1. Create a free **MongoDB Atlas** cluster and copy the connection string.
2. Push this project to a GitHub repo.
3. Import the repo into [Vercel](https://vercel.com).
4. In Vercel's Project Settings → Environment Variables, add:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
5. Deploy. Vercel automatically builds both the frontend and the API
   routes from the same project — no extra configuration needed.

You'll get one live URL for the entire app.

---

## Suggested Upwork Portfolio Entry

**Title:**
AI-Powered Customer Support SaaS — Built with Next.js & OpenAI API

**Description:**

🎯 Problem: Small businesses lose customers to slow support response
times and can't afford 24/7 human agents.

🔧 Solution: Built a full-stack SaaS platform using Next.js (App
Router + API routes), MongoDB, and the OpenAI API. Any business can
embed an AI chat widget that answers customers instantly, using
custom instructions the business owner defines.

⚙️ Key Features:
- Single Next.js codebase — pages and backend API routes together
- JWT authentication with per-business accounts
- OpenAI-powered chat with a custom persona per business
- Usage-based plan limits (SaaS billing-ready architecture)
- Analytics dashboard with conversation tracking (Recharts)
- Fully responsive, production-style UI (Tailwind CSS)

📊 Result: A deployable, multi-tenant SaaS foundation, live on a
single Vercel deployment, that could be extended with Stripe billing.

🔗 Live Demo: [your deployed link]
🔗 GitHub: [your repo link]

---

## Notes for Screenshots

Take screenshots of:
1. Landing page with the chat widget open
2. A live conversation with the AI replying
3. The dashboard stats + chart
4. The AI persona settings panel

Use 3–4 of these in your Upwork portfolio entry, ideally in a browser
mockup frame for a more polished look.
