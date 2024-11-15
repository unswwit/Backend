import { loadBlogPreviews } from '../../../lib/api';
import PageHeader from '../../../components/Header';
import styles from '../../../styles/BlogPost.module.css';
import { formatDate } from '../../../lib/helpers/date';
import Chip from '@material-ui/core/Chip';
import { useStyles, links } from '../../../data/blog';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Head from 'next/head';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import LoadingScreen from '../../../components/LoadingScreen';
import Image from 'next/image';
import React, { useEffect } from 'react';
import BlogSuggestions from '../../../components/BlogSuggestions';

const BlogDetails = ({ selectedBlog, blogContent }: any) => {
  const { date, heading, blog_no, category, content, author, img } =
    selectedBlog.fields;
  const imgUrl = 'https:' + img.fields.file.url;
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [headerLoading, setHeaderLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
    setHeaderLoading(false);
  }, []);

  return (
    <div>
      {loading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Head>
            <title>{heading + ' | UNSW WIT'}</title>
          </Head>
          <PageHeader
            imageLoading={setHeaderLoading}
            imgUrl="/headers/blog-header.jpg"
            title={'Blog Post #' + blog_no}
          />
          <div className={styles.document}>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.date}>{formatDate(date)}</p>
            <div className={styles.coverImgContainer}>
              <img className={styles.coverImg} src={imgUrl} alt="preview" />
            </div>
            <div className={styles.authorContainer}>
              {Object.keys(author).map((index) => (
                <>
                  <Image
                    src={'https:' + author[index].fields.img.fields.file.url}
                    alt={author[index].fields.name}
                    width="75"
                    height="75"
                    className={styles.authorPortrait}
                  />
                  <p className={styles.author} key={index}>
                    {author[index].fields.name}
                  </p>
                </>
              ))}
            </div>
            <div>
              <div className={styles.previewCategories}>
                {Object.keys(category).map((key) => (
                  <Chip
                    size="small"
                    label={category[key]}
                    className={classes.chip}
                    key={category[key]}
                  />
                ))}
              </div>
              <div className={styles.post}>
                {documentToReactComponents(content, renderOptions)}
              </div>
              <div className={styles.platformContainer}>
                {Object.keys(links).map((link, index) => {
                  return (
                    <a
                      href={
                        links[link][1] + 'unswwit.com/media/blog/' + blog_no
                      }
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.platformLogos}>
                        <Image
                          src={`/blog-logos/${links[link][0]}`}
                          alt={link}
                          width="30"
                          height="30"
                        />
                      </div>
                    </a>
                  );
                })}
              </div>
              <BlogSuggestions
                blogPreviews={blogContent}
                category={category}
                blogNo={blog_no}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetails;

// render code blocks, images and video embeds
const renderOptions = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'blogPost') {
        return (
          <a href={`/blog/${node.data.target.fields.slug}`}>
            {' '}
            {node.data.target.fields.title}
          </a>
        );
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'codeBlock') {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      } else if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      // render the EMBEDDED_ASSET as you need
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
          className={styles.image}
        />
      );
    },
  },
};

export async function getServerSideProps({ params }: any) {
  const blogContent = await loadBlogPreviews();
  let selectedBlog = blogContent.filter((blog: any) => {
    if (blog.fields.blog_no.toString() === params.blog_id) {
      return true;
    }
    return false;
  });
  selectedBlog = selectedBlog[0];
  return {
    props: { selectedBlog, blogContent },
  };
}
