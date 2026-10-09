import Link from "next/link";
import { brand } from "@/lib/data";

const footerLinks = [
  { label: "AP Physics", href: "/ap-physics" },
  { label: "Opportunities Hub", href: "/opportunities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/about#contact" },
  { label: "Sign In", href: "/sign-in" },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div>
        <strong>{brand.organizationName}</strong>
        <p>
          Girls Beyond Gravity is a platform that helps aspiring aerospace students
          master AP Physics and discover scholarships, internships,
          undergraduate programs, research opportunities, and competitions.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        {footerLinks.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
