"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import {
  Trash2,
  Plus,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Recommendation {
  _id: string;
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  avatar?: string;
  featured: boolean;
  approved: boolean;
}

export function RecommendationsClient({ initialRecommendations }: { initialRecommendations: Recommendation[] }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    testimonial: "",
    featured: false,
  });
  const router = useRouter();
  const selectedRecommendation = recommendations.find((rec) => rec._id === deleteId);

  useEffect(() => {
    setRecommendations(initialRecommendations);
  }, [initialRecommendations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Recommendation added successfully");
        setFormData({ name: "", role: "", company: "", testimonial: "", featured: false });
        setShowForm(false);
        router.refresh(); // Refresh server data
      } else {
        toast.error("Failed to add recommendation");
      }
    } catch (error) {
      console.error("Error adding recommendation:", error);
      toast.error("Failed to add recommendation");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/recommendations/${deleteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRecommendations((current) =>
          current.filter((rec) => rec._id !== deleteId)
        );
        toast.success("Recommendation deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete recommendation");
      }
    } catch (error) {
      console.error("Error deleting recommendation:", error);
      toast.error("Failed to delete recommendation");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const res = await fetch(`/api/recommendations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });

      if (res.ok) {
        toast.success(approved ? "Recommendation approved" : "Recommendation rejected");
        router.refresh();
      } else {
        toast.error("Failed to update recommendation");
      }
    } catch (error) {
      console.error("Error updating recommendation:", error);
      toast.error("Failed to update recommendation");
    }
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recommendations</h1>
          <p className="text-muted-foreground">
            Manage recommendations from colleagues and clients
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Recommendation
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Recommendation</CardTitle>
            <CardDescription>
              Add a new recommendation from a colleague or client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial">Testimonial *</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <Button type="submit">Add Recommendation</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No recommendations yet</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Recommendation
              </Button>
            </CardContent>
          </Card>
        ) : (
          recommendations.map((rec) => (
            <Card key={rec._id} className={rec.approved ? "" : "border-amber-500/30"}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-semibold text-lg">
                        {rec.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{rec.name}</h3>
                          {rec.featured && (
                            <Star className="h-4 w-4 fill-primary text-primary" />
                          )}
                          {rec.approved ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                              <CheckCircle className="h-3 w-3" /> Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full dark:bg-amber-900/30 dark:text-amber-400">
                              <Clock className="h-3 w-3" /> Pending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rec.role}{rec.company ? ` • ${rec.company}` : ""}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.testimonial}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApproval(rec._id, !rec.approved)}
                      className={rec.approved
                        ? "text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        : "text-green-600 border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"}
                    >
                      {rec.approved ? (
                        <>
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(rec._id)}
                      className="text-destructive hover:text-destructive"
                      aria-label={`Delete recommendation from ${rec.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      </div>
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle>Delete recommendation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete
              {selectedRecommendation ? ` ${selectedRecommendation.name}'s` : " this"} recommendation.
              This action cannot be undone.
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
