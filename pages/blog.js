import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from '../components/Layout';

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
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.slug} className="border-b pb-4">
              <Link legacyBehavior href={`/blog/${blog.slug}`}>
                <a className="text-xl font-medium text-blue-600 hover:underline">{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}