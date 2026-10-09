import Link from "next/link";

type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.href}>
          <Link href={item.href}>{item.label}</Link>
          {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
