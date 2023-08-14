"use client";

import Link from "next/link";

import styles from "./classes.module.scss";
import Card from "@/components/Card/Card";
import { Icon } from "@/components/Icon/Icon";
import PageTitle from "@/components/PageTitle/PageTitle";
import jsonData from "../../data/data.json";

export default function ClassesPage() {
  return (
    <div className={styles.root}>
      {jsonData.educationSystemsDetails.CBC.educationLevels.map((level) => (
        <>
          <PageTitle
            heading={level.name}
            description={level.years + " years"}
            level="h3"
          />
          <section>
            {level.grades.map((grade) => (
              // !link to grade page
              <Link href="/institution/classes/">
                <Card className={styles.card}>
                  <Card.Title>{grade}</Card.Title>
                  <Card.Content className={styles.content}>
                    <Icon glyph="classroom" />
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </section>
        </>
      ))}
    </div>
  );
}
