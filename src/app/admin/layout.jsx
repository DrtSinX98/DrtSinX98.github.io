import '@/styles/admin.css';

export const metadata = {
  title: 'Admin | Vortex',
  robots: { index: false, follow: false },
};

/**
 * Applies the saved admin theme before first paint. It runs while the browser is
 * still parsing, right after `#admin-root` opens, so a returning light-mode user
 * never sees the dark default flash by. Kept dependency-free and wrapped in
 * try/catch because storage access can throw (private windows, blocked cookies).
 */
const themeScript = `try{var t=localStorage.getItem('vortex-admin-theme');if(t==='light'||t==='dark')document.getElementById('admin-root').setAttribute('data-bs-theme',t)}catch(e){}`;

export default function AdminRootLayout({ children }) {
  // The panel has its own theme, independent of the site's day/night clock that
  // the root layout applies to <html>. Dark by default; the toggle in the top
  // bar switches it and remembers the choice. `suppressHydrationWarning`
  // because the script above may change the attribute before React hydrates.
  return (
    <div className="admin-root" id="admin-root" data-bs-theme="dark" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </div>
  );
}
