import { NotificationsSettingsForm } from "./notifications-form";
import SettingsPage from "../settingsPage";

export default function SettingsAccountPage() {
  return (
    <SettingsPage
      heading="Registration Details"
      description="This section contains information about your institution used by
          various state departments and agencies."
      form={<NotificationsSettingsForm />}
    />
  );
}
