"use client";

import styles from "./Navigation.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, Glyph } from "@/components/Icon/Icon";
import { IconButton } from "@/components/Button/Button";
import { Badge } from "@/components/Badge/Badge";
import { Divider } from "@/components/Divider/Divider";
import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { is } from "date-fns/locale";

interface NavigationProps {
  className?: string;
  links: {
    headline: string;
    href: string;
    collapsed?: boolean;
    items: {
      href: string;
      label: string;
      icon: Glyph;
      badge?: string;
    }[];
  }[];
}

export const Navigation = ({ className, links, ...props }: NavigationProps) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
        <IconButton
          size="medium"
          variant="ghost"
          icon="menu"
          className={styles.menu}
        />
      </div>
      <div className={styles.links}>
        {links.map((section) => (
          <NavigationSection
            key={section.headline}
            headline={section.headline}
            collapsed={section.collapsed}
            sectionItems={section.items}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link className={styles.settings} href="/settings">
            <Icon glyph="settings" size="medium" />
            Settings
          </Link>
          <Link className={styles.logout} href="/settings">
            <Icon glyph="logout" size="medium" />
            Log out
          </Link>
        </div>
        <img src="/coa.svg" alt="Coart of Arms, Kenya" />
      </div>
    </div>
  );
};

interface NavigationSectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  headline: string;
  collapsed?: boolean;
  sectionItems: {
    href: string;
    label: string;
    icon: Glyph;
    badge?: string;
  }[];
}

const NavigationSection = ({
  className,
  headline,
  collapsed = false,
  sectionItems,
  ...props
}: NavigationSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <div
      className={classNames(
        styles.section,
        isCollapsed ? styles.collapsed : null,
        className
      )}
      {...props}
    >
      {headline && (
        <h3 className={styles.headline}>
          {headline}
          <div>
            <Badge className={styles.headlineBadge} size={"small"} />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isCollapsed ? 270 : 180 }}
            >
              <IconButton
                icon="chevronDown"
                variant="ghost"
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </motion.div>
          </div>
        </h3>
      )}
      {sectionItems.map((item) => (
        <motion.div
          key={item.href}
          variants={variants}
          custom={isCollapsed}
          initial="item"
          animate="item"
        >
          <NavigationItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
          />
        </motion.div>
      ))}
      {props.children}
      {!isCollapsed && headline && <Divider className={styles.divider} />}
    </div>
  );
};

interface NavigationItemProps {
  className?: string;
  href: string;
  label: string;
  icon: Glyph;
  badge?: string;
}

const NavigationItem = ({
  href,
  label,
  icon,
  badge,
  className,
  ...props
}: NavigationItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={classNames(
        styles.item,
        pathname === href ? styles.selected : null,
        className
      )}
    >
      <div>
        <Icon glyph={icon} />
        <p className="label-large">{label}</p>
      </div>
      {badge && (
        <Badge className={styles.itemBadge} text={badge} size="medium" />
      )}
    </Link>
  );
};

let variants = {
  item: (isCollapsed: boolean) => {
    return {
      height: isCollapsed ? 0 : "auto",
      opacity: isCollapsed ? 0 : 1,
      transition: {
        height: {
          delay: isCollapsed ? 0.05 : 0,
        },
        opacity: {
          delay: isCollapsed ? 0 : 0.05,
        },
      },
    };
  },
};
