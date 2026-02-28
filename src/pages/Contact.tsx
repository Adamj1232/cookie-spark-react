import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import pageHeaderBg from "@/assets/page-header-bg.png";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Page Header */}
      <section
        className="relative bg-muted flex flex-col items-center justify-center py-20 px-4"
        style={{
          backgroundImage: `url(${pageHeaderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <h1 className="font-heading text-foreground text-4xl sm:text-5xl mb-3">
          Contact
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Subheading: Craft a compelling subheading that sparks curiosity.
        </p>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="font-heading text-foreground text-3xl sm:text-4xl mb-4">
            Contact Us
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-10">
            Ready to bring your vision to life? Contact me today, and let's
            create something amazing together!
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-bold text-foreground">Phone</p>
                <p className="text-foreground/70">(303) 555-0105</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-bold text-foreground">Email</p>
                <p className="text-foreground/70">support@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <p className="font-bold text-foreground">Address</p>
                <p className="text-foreground/70">
                  6391 Elgin St. Celina, Delaware 10299
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-muted rounded-lg p-8">
          <h3 className="font-heading text-foreground text-xl mb-6">
            Send us a message
          </h3>

          {submitted ? (
            <p className="text-primary font-bold text-lg">
              Thank you! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <textarea
                  placeholder="Comment or Message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-wide py-3 rounded-full transition-transform hover:scale-[1.02]"
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
