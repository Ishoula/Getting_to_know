"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, Trash2, Mail, MailOpen, Loader2 } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface MessagesTableProps {
  messages: Message[];
}

export function MessagesTable({ messages }: MessagesTableProps) {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function markAsRead(message: Message) {
    if (message.read) return;

    try {
      await fetch(`/api/contact/${message._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });
      router.refresh();
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/contact/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }

  function openMessage(message: Message) {
    setSelectedMessage(message);
    markAsRead(message);
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-lg">
        <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No messages yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Messages from your contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]" />
              <TableHead>From</TableHead>
              <TableHead className="hidden md:table-cell">Message</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message._id}
                className={!message.read ? "bg-muted/50" : ""}
              >
                <TableCell>
                  {message.read ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" />
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <p className={!message.read ? "font-semibold" : "font-medium"}>
                      {message.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <p className="line-clamp-1 text-muted-foreground max-w-md">
                    {message.message}
                  </p>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {new Date(message.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openMessage(message)}
                      title="View message"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(message._id)}
                      className="text-destructive hover:text-destructive"
                      title="Delete message"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Message Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>{selectedMessage?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={selectedMessage?.read ? "secondary" : "default"}>
                {selectedMessage?.read ? "Read" : "New"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {selectedMessage &&
                  new Date(selectedMessage.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <a href={`mailto:${selectedMessage?.email}`}>Reply via Email</a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The message will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
