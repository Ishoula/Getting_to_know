"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8 animate-fade-in-up">
          <Link 
            href="/" 
            className="inline-block text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            Portfolio
          </Link>
        </div>
        
        <Card className="border-border/50 shadow-lg animate-fade-in-up animation-delay-100">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LockKeyhole className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {state?.error && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in bg-destructive/10 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{state.error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md" 
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-in animation-delay-200">
          <Link href="/" className="hover:text-foreground transition-colors">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
