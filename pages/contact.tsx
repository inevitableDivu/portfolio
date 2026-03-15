import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Textarea } from "@/components/ui";
import { Copy, Check } from "@hugeicons/core-free-icons";
import SocialIcons from "@/components/social.buttons";
import { toast } from "sonner";
import FullPageSections from "@/components/wrapper/full-page.wrapper";
import { HugeiconsIcon } from "@hugeicons/react";

const EMAIL = "pandeydivyansh070501@gmail.com";

function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    // Modern approach
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for non-secure contexts (e.g., HTTP on mobile)
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy", err);
    }
    document.body.removeChild(textArea);
  }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ContactContent = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    toast("Opening mail client...", {
      description: "Please complete and send your message in your email app.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="max-w-lg mx-auto px-6 space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl md:text-5xl font-bold text-primary"
        >
          Contact Me
        </motion.h1>
        <motion.p variants={fadeUp} className="text-muted-foreground">
          Have an idea or just want to say hi? Drop me a message.
        </motion.p>
      </div>

      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-3"
      >
        <span className="text-sm text-muted-foreground">{EMAIL}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-1.5"
        >
          {copied ? (
            <HugeiconsIcon icon={Check} size={14} />
          ) : (
            <HugeiconsIcon icon={Copy} size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </motion.div>

      <motion.form
        variants={fadeUp}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input name="name" placeholder="Your name" required />
        <Input name="email" type="email" placeholder="Your email" required />
        <Textarea name="message" placeholder="Your message" rows={4} required />
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </motion.form>

      <motion.div variants={fadeUp} className="pt-2">
        <SocialIcons />
      </motion.div>
    </motion.div>
  );
};

const sections = [
  { id: "contact", label: "Contact", content: <ContactContent /> },
];

const Contact = () => <FullPageSections sections={sections} />;

export default Contact;
