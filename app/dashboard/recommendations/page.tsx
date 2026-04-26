"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Star } from "lucide-react";
import { toast } from "sonner";

interface Recommendation {
  _id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar?: string;
  featured: boolean;
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    testimonial: "",
    featured: false,
  });

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("/api/recommendations");
      const data = await res.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

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
        fetchRecommendations();
      } else {
        toast.error("Failed to add recommendation");
      }
    } catch (error) {
      console.error("Error adding recommendation:", error);
      toast.error("Failed to add recommendation");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recommendation?")) return;

    try {
      const res = await fetch(`/api/recommendations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Recommendation deleted");
        fetchRecommendations();
      } else {
        toast.error("Failed to delete recommendation");
      }
    } catch (error) {
      console.error("Error deleting recommendation:", error);
      toast.error("Failed to delete recommendation");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recommendations</h1>
          <p className="text-muted-foreground">
            Manage recommendations from colleagues and clients
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>Cancel</>
          ) : (
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
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
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

      <div className="grid gap-4">
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
            <Card key={rec._id}>
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
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rec.role} • {rec.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.testimonial}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(rec._id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
