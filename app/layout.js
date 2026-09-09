import "./globals.css";

export const metadata = {
  title: "SupportPilot AI — AI-Powered Customer Support",
  description:
    "Give every website visitor a 24/7 AI support agent, trained on your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
