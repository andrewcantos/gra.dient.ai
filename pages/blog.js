import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'blogs');
  const filenames = fs.readdirSync(blogDirectory);

  const blogs = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    return {
      slug,
      title: slug.replace(/-/g, ' ').toUpperCase(),
    };
  });

  return {
    props: {
      blogs,
    },
  };
}

export default function Blog({ blogs }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Blog</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}