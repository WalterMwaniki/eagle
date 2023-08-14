import { AccountForm } from "./account-form";
import SettingsPage from "./settingsPage";

export default function SettingsAccountPage() {
  return (
    <SettingsPage
      heading="Account"
      description="Manage your account settings and set e-mail preferences."
      form={<AccountForm />}
    />
  );
}
