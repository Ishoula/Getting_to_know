import { Metadata } from "next/types";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import ContactMessage from "@/models/ContactMessage";
import Recommendation from "@/models/Recommendation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Mail, MailOpen, Clock, Star } from "lucide-react";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard overview",
};

async function getStats() {
  try {
    await connectToDatabase();

    const [projectCount, messageCount, unreadCount, recCount] = await Promise.all([
      Project.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      Recommendation.countDocuments(),
    ]);


    const [recentMessages, recentRecommendations] = await Promise.all([
      ContactMessage.find({}).sort({ createdAt: -1 }).limit(5).lean(),
      Recommendation.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return {
      projectCount,
      messageCount,
      unreadCount,
      recCount,
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
      recentRecommendations: JSON.parse(JSON.stringify(recentRecommendations)),
    };

  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      projectCount: 0,
      messageCount: 0,
      unreadCount: 0,
      recCount: 0,
      recentMessages: [],
      recentRecommendations: [],
    };

  }
}

export default async function DashboardPage() {
  const { 
    projectCount, 
    messageCount, 
    unreadCount, 
    recCount, 
    recentMessages, 
    recentRecommendations 
  } = await getStats();


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/projects" className="hover:underline">
                Manage projects
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/messages" className="hover:underline">
                View all messages
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MailOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0 ? "Requires attention" : "All caught up!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/recommendations" className="hover:underline">
                Manage recommendations
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>


      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message: {
                  _id: string;
                  name: string;
                  email: string;
                  message: string;
                  read: boolean;
                  createdAt: string;
                }) => (
                  <div
                    key={message._id}
                    className="flex items-start justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{message.name}</p>
                        {!message.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="text-sm line-clamp-1">{message.message}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No messages yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Recommendations</CardTitle>
            <CardDescription>Latest testimonials received</CardDescription>
          </CardHeader>
          <CardContent>
            {recentRecommendations.length > 0 ? (
              <div className="space-y-4">
                {recentRecommendations.map((rec: {
                  _id: string;
                  name: string;
                  role: string;
                  company: string;
                  approved: boolean;
                  createdAt: string;
                }) => (
                  <div
                    key={rec._id}
                    className="flex items-start justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{rec.name}</p>
                        {!rec.approved && (
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rec.role} at {rec.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No recommendations yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
