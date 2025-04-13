import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/home.module.css';

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
        <ul className={styles.blogList}>
          {blogs.map((blog) => (
            <li key={blog.slug} className={styles.blogListItem}>
              <Link legacyBehavior href={`/blog/${blog.slug}`}>
                <a className={styles.blogLink}>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}