import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Ishoula",
  description: "My professional experience, education, and skills.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
