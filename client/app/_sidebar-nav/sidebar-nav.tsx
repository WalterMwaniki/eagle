"use client";

import styles from "./sidebar-nav.module.scss";

import Link from "next/link";
import { Icon, Glyph } from "@/components/Icon/Icon";
import { ThemeToggle } from "@/components/Theme/Theme";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo/Logo";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: Glyph;
    subItems: {
      href: string;
      title: string;
    }[];
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.root} {...props}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
        {/* <Input className={styles.search} type="search" glyph="search" /> */}
      </div>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <>
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? styles.item + " " + styles.itemSelected
                  : styles.item
              }
            >
              <Icon glyph={item.icon} size="medium" />
              {item.title}
            </Link>
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={
                  pathname === subItem.href
                    ? styles.subItem + " " + styles.subItemSelected
                    : styles.subItem
                }
              >
                {subItem.title}
              </Link>
            ))}
          </>
        ))}
      </div>
      <div className={styles.footer}>
        {/* <ThemeToggle className={styles.themeToggle} /> */}
        <Link className={styles.settings} href="/settings">
          <Icon glyph="settings" size="medium" />
          Settings
        </Link>
        <Link className={styles.logout} href="/settings">
          <Icon glyph="logout" size="medium" />
          Log out
        </Link>
      </div>
    </nav>
  );
}
