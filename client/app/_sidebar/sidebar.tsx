"use client";

import Link from "next/link";
import { Icon, Glyph } from "@/components/Icon/Icon";
import { usePathname } from "next/navigation";

import styles from "./sidebar.module.scss";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: Glyph;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href
              ? styles.sidebarNavItem + " " + styles.sidebarNavItemSelected
              : styles.sidebarNavItem
          }
        >
          <Icon glyph={item.icon} size="small" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
