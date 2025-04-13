import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { marked } from 'marked';

export async function getStaticPaths() {
  const blogDirectory = path.join(process.cwd(), 'blogs');
  const filenames = fs.readdirSync(blogDirectory);

  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogDirectory = path.join(process.cwd(), 'blogs');
  const filePath = path.join(blogDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      title: data.title,
      date: data.date,
      content,
    },
  };
}

export default function BlogPost({ title, date, content }) {
  const htmlContent = marked(content);

  return (
    <Layout>
      <div className="blogContainer"> {/* Use a new class for blog article layout */}
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-sm text-gray-400 mb-8">{date}</p>
        <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </Layout>
  );
}