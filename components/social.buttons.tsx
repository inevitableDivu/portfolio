import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const socials = [
  { icon: Github, href: "https://github.com/inevitableDivu", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/divyansh-pandey-8b0981181",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/code.with.divu",
    label: "Instagram",
  },
  { icon: Mail, href: "/contact", label: "Email" },
];

const SocialIcons = () => (
  <div className="flex items-center justify-center gap-6">
    {socials.map(({ icon: Icon, href, label }) => (
      <Link
        key={label}
        href={href}
        aria-label={label}
        className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125"
        target={href.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        <HugeiconsIcon icon={Icon} size={20} strokeWidth={2} />
      </Link>
    ))}
  </div>
);

export default SocialIcons;
