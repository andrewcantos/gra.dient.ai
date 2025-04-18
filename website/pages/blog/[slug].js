import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import { marked } from 'marked';

export async function getStaticPaths() {
  const blogDirectory = path.join(process.cwd(), 'blogs');
  let filenames = [];
  if (fs.existsSync(blogDirectory)) {
    filenames = fs.readdirSync(blogDirectory);
  } // else leave as empty array

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
  let fileContents = '';
  if (fs.existsSync(filePath)) {
    fileContents = fs.readFileSync(filePath, 'utf8');
  }
  const { data, content } = matter(fileContents || '');

  return {
    props: {
      title: data?.title || '',
      date: data?.date || '',
      content: content || '',
    },
  };
}

export default function BlogPost({ title, date, content }) {
  const htmlContent = marked(content);

  return (
    <Layout>
      <div className="blogContainer"> {/* Ensure proper alignment */}
        <h1 className="blogTitle">{title}</h1> {/* Use blogTitle class for consistent styling */}
        <p className="blogDate">{date}</p> {/* Use blogDate class for consistent styling */}
        <div className="blogContent prose prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }} /> {/* Use blogContent class for consistent styling */}
      </div>
    </Layout>
  );
}