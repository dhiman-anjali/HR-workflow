import "./globals.css";

export const metadata = {
  title: "HR Workflow Designer",
  description: "Prototype with React Flow",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
