import React from 'react';
import BlogPreview from './BlogPreview';
import styles from '../styles/Blog.module.css';
const BlogSuggestions = ({ blogPreviews, category, blogNo }: any) => {
  const filteredBlogs = blogPreviews.filter(
    (blog: any) =>
      blog.fields.category.every((c: any) => category.includes(c)) &&
      blog.fields.blog_no !== blogNo
  );
  const selectedBlogs = filteredBlogs.splice(0, 3);

  return (
    <>
      <div className={styles.suggestionsContainer}>
        <h2 className={styles.blogRecommendationsTitle}>MORE FROM WIT</h2>
        <div className={styles.blogRecommendationsContainer}>
          {selectedBlogs.map((individualBlogPreview: any, index: any) => {
            return (
              <BlogPreview
                key={index}
                individualBlogPreview={individualBlogPreview}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BlogSuggestions;
