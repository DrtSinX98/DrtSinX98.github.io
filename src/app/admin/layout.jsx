import '@/styles/admin.css';

export const metadata = {
  title: 'Admin | Vortex',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  // Forced dark palette so the panel looks the same regardless of the site's
  // day/night theme, which the root layout applies to <html>.
  return (
    <div className="admin-root" data-bs-theme="dark">
      {children}
    </div>
  );
}
