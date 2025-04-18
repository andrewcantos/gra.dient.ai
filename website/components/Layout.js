import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gradient</h1>
        <nav>
          <Link legacyBehavior href="/">
            <a style={{ marginRight: '1rem', textDecoration: 'none', color: 'inherit' }}>Home</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}