import { SettingsPanel } from '@/components/SettingsPanel';

export function SettingsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-6 text-center font-display text-2xl font-bold">Settings</h1>
      <SettingsPanel />
    </div>
  );
}
