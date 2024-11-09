// @ts-nocheck comment
import { loadBlogPreviews, loadBlogRecommendations } from '../../lib/api';
import styles from '../../styles/Blog.module.css';
import React, { useState, useEffect } from 'react';
import BlogPreview from '../../components/BlogPreview';
import PageHeader from '../../components/Header';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScrollUpBtn from '../../components/ScrollUpBtn';
import PaginationComp from '../../components/Pagination';
import LoadingScreen from '../../components/LoadingScreen';
import { BootstrapTooltip } from '../../components/BootstrapTooltip';
import { isMobile } from 'react-device-detect';
import { useStyles, categoryDescriptions } from '../../data/blog';
import Head from 'next/head';
import { revalidate } from '../../lib/helpers/constants';

const Blog = ({ recommendations, blogPreviews }) => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  // all blog posts
  const [blogs, setBlogs] = useState([]);
  // set how many posts to view per page
  const postsPerPage = 10;
  // current page number
  const [currentPage, setCurrentPage] = useState(1);
  // all the posts of the selected filter category
  const [selectedPosts, setSelectedPosts] = useState([]);
  // the posts displayed on the current page
  const [currentPosts, setCurrentPosts] = useState([]);
  // search term (user input) for blog search bar
  const [searchTerm, setSearchTerm] = useState('');
  // if there are search results
  const [emptyCategory, setEmptyCategory] = useState(false);
  // filter blogs by a selected category
  const filterBlogs = (category, searchTerm) => {
    const filteredBlogs = blogs.filter(
      (blog) =>
        category === 'All' ||
        blog.fields.category.includes(category) ||
        (blog.fields.category.includes('WCW') &&
          category === 'WIT Crush Wednesday')
    );
    searchBlogs(filteredBlogs, searchTerm);
  };

  // search blogs by heading or subheading
  const searchBlogs = (filteredBlogs, searchTerm) => {
    const searchResults = filteredBlogs.filter((blog) => {
      if (
        searchTerm === '' ||
        blog.fields.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.fields.subheading.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedPosts(searchResults);
    setCurrentPosts(searchResults.slice(0, postsPerPage));
    setCurrentPage(1);
  };

  const blogSet = (tempBlogs) => {
    setBlogs(tempBlogs);
    setCurrentPosts(tempBlogs.slice(0, postsPerPage));
    setSelectedPosts(tempBlogs);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
    blogSet(blogPreviews);
  }, [blogPreviews]);

  // no search results message
  useEffect(() => {
    if (currentPosts.length === 0) {
      setEmptyCategory(true);
    } else {
      setEmptyCategory(false);
    }
  }, [currentPosts]);

  // Select blog posts for viewing on the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentPosts(
      selectedPosts.slice(
        (pageNumber - 1) * postsPerPage,
        pageNumber * postsPerPage
      )
    );
  };

  return (
    <div>
      {loading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Head>
            <title>Blog Posts | UNSW WIT</title>
          </Head>
          {/* Cover Photo */}
          <PageHeader
            imageLoading={setHeaderLoading}
            imgUrl="/headers/blog-header.jpg"
            title="Blog Posts"
          />
          <div className={styles.blogGallery}>
            <div id={styles.blogLoadingContainer}>
              {loading && (
                <CircularProgress
                  variant="indeterminate"
                  size={50}
                  thickness={5}
                  id={styles.blogsLoading}
                />
              )}
            </div>
            {/* Start of blog recommendation */}
            {!loading && (
              <>
                <h2 className={styles.blogRecommendationsTitle}>
                  WIT-Commendations
                </h2>
                <div className={styles.blog}>
                  <div className={styles.blogRecommendations}>
                    {recommendations.map((recommendation) => (
                      <BlogRecommendations
                        key={recommendation.sys.id}
                        recommendation={recommendation}
                      />
                    ))}
                  </div>
                </div>
                {/* End of blog recommendations */}
                {/* Start of other blogs */}
                <h2>MORE FROM WIT</h2>
                {/* Start of blog categories */}
                <div className={styles.blogCategories}>
                  {Object.keys(categoryDescriptions)
                    .sort()
                    .map((category) => {
                      const chipColour =
                        selectedCategory === category
                          ? '#e85f5c'
                          : window.matchMedia &&
                            window.matchMedia('(prefers-color-scheme: dark)')
                              .matches
                          ? '#676767'
                          : '#7F7F7F';
                      return (
                        <BootstrapTooltip
                          key={category}
                          title={
                            <>
                              <div className={styles.tooltipTitle}>
                                {category}
                              </div>
                              <p className={styles.tooltipDescription}>
                                {categoryDescriptions[category]}
                              </p>
                            </>
                          }
                        >
                          <Chip
                            size="medium"
                            label={category}
                            className={classes.chip}
                            style={{
                              backgroundColor: chipColour,
                            }}
                            onClick={() => {
                              setSelectedCategory(category);
                              filterBlogs(category, searchTerm);
                            }}
                          />
                        </BootstrapTooltip>
                      );
                    })}
                </div>
                {/* End of blog categories */}
                {/* Start of search bar */}
                <div className={styles.searchBar}>
                  <input
                    className={styles.inputSearchBar}
                    type="text"
                    placeholder="Search blog posts"
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      filterBlogs(selectedCategory, event.target.value);
                    }}
                  />
                </div>
                <div>
                  {emptyCategory === true && (
                    <p className={styles.emptyMessage}>
                      No results were found.
                    </p>
                  )}
                </div>
                {/* End of search bar */}
                {/* Start of blog posts */}
                <div className={styles.blogPosts}>
                  {!loading &&
                    !isMobile &&
                    currentPosts.map((individualBlogPreview, index) => {
                      return (
                        <BlogPreview
                          key={index}
                          individualBlogPreview={individualBlogPreview}
                        />
                      );
                    })}
                  {!loading &&
                    isMobile &&
                    selectedPosts.map((individualBlogPreview, index) => {
                      return (
                        <BlogPreview
                          key={index}
                          individualBlogPreview={individualBlogPreview}
                        />
                      );
                    })}
                </div>
                {!loading && !isMobile && (
                  <PaginationComp
                    totalPages={Math.ceil(selectedPosts.length / postsPerPage)}
                    paginate={paginate}
                    page={currentPage}
                    size="large"
                  />
                )}
                <ScrollUpBtn />
                {/*End of blog posts*/}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;

export async function getStaticProps() {
  const recommendations = await loadBlogRecommendations();
  const blogPreviews = await loadBlogPreviews();
  return {
    props: { recommendations, blogPreviews },
    revalidate: revalidate,
  };
}
