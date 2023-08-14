import { LocationForm } from "./location-form";
import SettingsPage from "../../settings/settingsPage";

export default function SettingsAccountPage() {
  return (
    <SettingsPage
      heading="Institution Location"
      description="Manage your institution's location details."
      form={<LocationForm />}
    />
  );
}
