import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for project inquiries or collaborations.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or just want to say hello? I&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:hello@example.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Response Time</h2>
              <p className="text-muted-foreground">
                I typically respond within 24-48 hours. For urgent matters,
                please mention it in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
