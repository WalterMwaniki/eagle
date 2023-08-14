import "./globals.scss";
import styles from "./app.module.scss";
import classNames from "classnames";
import { Inter, Roboto } from "next/font/google";

import { Glyph, Icon } from "@/components/Icon/Icon";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/Theme/Theme";
import { Navigation } from "@/components/Navigation/Navigation";
import { Header } from "@/components/Header/Header";

export const metadata = {
  title: "Ushindi Brilliant School",
  description: "National Education Management Information System",
};

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const NavigationItems = [
  {
    headline: "",
    href: "/",
    items: [
      {
        href: "/",
        label: "Dashboard",
        icon: "dashboard" as Glyph,
      },
    ],
  },
  {
    headline: "Institution",
    href: "/institution",
    items: [
      {
        href: "/institution",
        label: "My Institution",
        icon: "organization" as Glyph,
      },
      {
        href: "/institution/facilities",
        label: "Facilities",
        icon: "organization" as Glyph,
      },
      {
        href: "/institution/equipment",
        label: "Equipment",
        icon: "organization" as Glyph,
      },
      {
        href: "/institution/finances",
        label: "Finances",
        icon: "organization" as Glyph,
      },
    ],
  },
  {
    headline: "Students",
    href: "/students",
    items: [
      {
        href: "/students",
        label: "View Students",
        icon: "student" as Glyph,
      },
      {
        href: "/students/add",
        label: "Add Student",
        icon: "addUser" as Glyph,
      },
      {
        href: "/students/pending",
        label: "Pending Students",
        icon: "pendingUser" as Glyph,
        badge: "18",
      },
    ],
  },
  {
    headline: "Teachers",
    href: "/teachers",
    items: [
      {
        href: "/teachers",
        label: "View Teachers",
        icon: "teacher" as Glyph,
      },
    ],
  },
  {
    headline: "Classes",
    href: "/classes",
    collapsed: true,
    items: [
      {
        href: "/classes",
        label: "View Classes",
        icon: "star" as Glyph,
      },
      {
        href: "classes/pre-primary-1",
        label: "Pre-Primary 1",
        icon: "star" as Glyph,
      },
      {
        href: "classes/pre-primary-2",
        label: "Pre-Primary 2",
        icon: "star" as Glyph,
      },
      {
        href: "classes/grade-1",
        label: "Grade 1",
        icon: "star" as Glyph,
      },
      {
        href: "classes/grade-2",
        label: "Grade 2",
        icon: "star" as Glyph,
      },
      {
        href: "classes/grade-3",
        label: "Grade 3",
        icon: "star" as Glyph,
      },
      {
        href: "classes/grade-4",
        label: "Grade 4",
        icon: "star" as Glyph,
      },
      {
        href: "classes/grade-5",
        label: "Grade 5",
        icon: "star" as Glyph,
      },
      {
        href: "classes/grade-6",
        label: "Grade 6",
        icon: "star" as Glyph,
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className}>
        <Providers>
          <div className={styles.container}>
            <Navigation links={NavigationItems} />
            <div className={styles.page}>
              <Header title={metadata.title} />
              <main>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
