import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/blog-post.module.css";
import BlogPreview from "./BlogPreview";
import axios from "axios";
import humps from "humps";

const BlogSuggestions = ({ props, blogPreviews }) => {
  console.log(props);
  console.log(blogPreviews);
  // set how many posts to view per page
  const postsPerPage = 3;
  // all the posts of the selected filter category
  const [selectedPosts, setSelectedPosts] = useState([]);

  // get blog authors
  // input: blog authors data from google sheets
  // output: blog authors array of dictionaries
  const loadAuthors = () => {
    return new Promise((resolve, reject) => {
      const fetchBlogAuthors = async () => {
        const res = await axios.get(
          "https://wit-database.herokuapp.com/blog/authors"
        );
        resolve(humps.camelizeKeys(res.data));
      };
      fetchBlogAuthors().catch((error) =>
        // error handling
        console.error(error)
      );
    });
  };

  // renaming authors to be the image location of the author image and name
  const renameAuthors = (blogOriginal, authorList, blogPreviews) => {
    console.log(blogOriginal);
    blogOriginal.forEach((blogPreview, index) => {
      const tempAuthor = {};

      blogPreview.fields.authors.forEach((authorKey) => {
        const result = authorList.filter(
          (authorItem) => authorItem.authors === authorKey
        )[0];
        tempAuthor[authorKey] = [
          `/portraits/blog-authors/${result.img}`,
          result.name,
        ];
      });
      blogPreviews[index].authors = tempAuthor;
    });
  };

  const blogSet = (tempBlogs) => {
    setSelectedPosts(tempBlogs.slice(0, postsPerPage));
  };

  // returns a flitered list of blogs
  const filterBlogs = useCallback(
    (blogPreviews) => {
      const filteredBlogs = blogPreviews.filter(
        (blog) =>
          props.category.includes(blog.category.split(",")) ||
          blog.fields.category.includes(props.category.split(","))
      );
      return filteredBlogs;
    },
    [props]
  );

  // get blog previews
  // input: previews data from google sheets
  // output: blog previews array of dictionaries
  const loadBlogs = useCallback(
    (authorList) => {
      const blogOriginal = blogPreviews;
      renameAuthors(blogOriginal, authorList, blogPreviews);

      // remove current blog from blog suggestions
      blogPreviews.splice(props.index - 1, 1);
      blogSet(blogPreviews);

      // filter blogs by category
      const filteredBlogs = filterBlogs(blogPreviews);

      const tempBlogs = filteredBlogs.reverse();
      blogSet(tempBlogs);
    },
    [filterBlogs, props]
  );

  useEffect(() => {
    loadAuthors().then((response) => loadBlogs(response));
  }, [loadBlogs]);

  return (
    <div>
      <div className={styles.blogSuggestionsText}>
        <p className={styles.subHeading}>More From WIT</p>
      </div>
      <div className={styles.blogPosts}>
        {selectedPosts.map((blog, index) => {
          return (
            <BlogPreview
              key={index}
              individualBlogPreview={blog}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default BlogSuggestions;