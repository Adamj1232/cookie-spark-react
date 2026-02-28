import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import pageHeaderBg from "@/assets/page-header-bg.png";
import { BUSINESS_PROFILE } from "@/features/ordering/config";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section
        className="relative flex flex-col items-center justify-center bg-muted px-4 py-20"
        style={{
          backgroundImage: `url(${pageHeaderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <h1 className="mb-3 text-4xl text-foreground sm:text-5xl">Contact</h1>
        <p className="text-base text-foreground/80 sm:text-lg">Questions, custom orders, or delivery requests in Arvada/Denver.</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:py-24 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl text-foreground sm:text-4xl">Get in touch</h2>
          <p className="mb-10 leading-relaxed text-foreground/80">
            We reply quickly on order inquiries and special requests. Include your requested date and quantity so we can
            provide an accurate confirmation.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 shrink-0 text-primary" size={20} />
              <div>
                <p className="font-bold text-foreground">Phone</p>
                <p className="text-foreground/70">{BUSINESS_PROFILE.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 shrink-0 text-primary" size={20} />
              <div>
                <p className="font-bold text-foreground">Email</p>
                <p className="text-foreground/70">{BUSINESS_PROFILE.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 shrink-0 text-primary" size={20} />
              <div>
                <p className="font-bold text-foreground">Location</p>
                <p className="text-foreground/70">
                  {BUSINESS_PROFILE.city}, {BUSINESS_PROFILE.state}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h3 className="mb-6 text-xl text-foreground">Send us a message</h3>

          {submitted ? (
            <p className="text-lg font-bold text-primary">Thank you. We will follow up with order details shortly.</p>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <input
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  required
                  type="text"
                  value={form.name}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">Phone Number</label>
                <input
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  type="tel"
                  value={form.phone}
                />
              </div>
              <div>
                <input
                  className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  required
                  type="email"
                  value={form.email}
                />
              </div>
              <div>
                <textarea
                  className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Comment or message"
                  rows={4}
                  value={form.message}
                />
              </div>
              <button
                className="w-full rounded-full bg-primary py-3 font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02]"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact;
