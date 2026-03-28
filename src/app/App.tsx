import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ClientProvider>
          <RouterProvider router={router} />
        </ClientProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}