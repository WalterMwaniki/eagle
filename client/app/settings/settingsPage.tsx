import styles from "./settings.module.scss";
import { PageTitle } from "@/components/PageTitle/PageTitle";

interface SettingsPageProps {
  form: React.ReactNode;
  heading: string;
  description: string;
}
export default function SettingsPage({
  form,
  heading,
  description,
}: SettingsPageProps) {
  return (
    <div className={styles.settingsPage}>
      <PageTitle heading={heading} description={description} level="h2" />
      {form}
    </div>
  );
}
