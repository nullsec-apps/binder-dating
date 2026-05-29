import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppShell } from '@/components/AppShell';
import { DiscoverPage } from '@/pages/DiscoverPage';
import { MatchesPage } from '@/pages/MatchesPage';
import { ChatsPage } from '@/pages/ChatsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { BinderProvider } from '@/store/binderStore';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <BinderProvider>
          <BrowserRouter>
            <Toaster position="top-center" toastOptions={{ style: { background: '#13151c', color: '#F5F7FA', border: '1px solid rgba(255,255,255,0.1)' } }} />
            <Routes>
              <Route element={<AppShell />}>
                <Route path="/" element={<Navigate to="/discover" replace />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/discover" replace />} />
            </Routes>
          </BrowserRouter>
        </BinderProvider>
      </TooltipProvider>
    </ErrorBoundary>
  );
}
