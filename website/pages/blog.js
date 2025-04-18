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
      title: slug.replace(/-/g, ' '), // Removed all caps formatting
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
      <ul className={styles.blogList}> {/* Minimal list format without default bullets */}
        {blogs.map((blog) => (
          <li key={blog.slug} className={styles.blogListItem}> {/* Styled list item */}
            <Link legacyBehavior href={`/blog/${blog.slug}`}>
              <a className={styles.blogLink}>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}