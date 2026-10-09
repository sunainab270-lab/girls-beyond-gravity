import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
