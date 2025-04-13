import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <header>
        <h1>Gradient</h1>
        <nav>
          <Link legacyBehavior href="/">
            <a>Home</a>
          </Link>
          {router.pathname !== '/blog' && (
            <Link legacyBehavior href="/blog">
              <a>Blog</a>
            </Link>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}