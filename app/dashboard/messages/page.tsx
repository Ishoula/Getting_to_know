import { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { MessagesTable } from "@/components/dashboard/messages-table";

export const metadata: Metadata = {
  title: "Messages",
  description: "View contact form submissions",
};

async function getMessages() {
  try {
    await connectToDatabase();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Contact form submissions from your visitors
        </p>
      </div>

      <MessagesTable messages={messages} />
    </div>
  );
}
