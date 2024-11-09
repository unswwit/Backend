import React from 'react';
import styles from '../styles/HomeEventsCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const EventsSection = (props: any) => {
  const latestEvent = props.latestEvent;
  const latestBlog = props.latestBlog;
  const latestPodcast = props.latestPodcast;
  return (
    <section className={styles.eventsSection}>

      {/*Start of first card*/}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Link
            href={`/events/event-recaps/${latestEvent.fields.year}/${latestEvent.fields.eventNumber}`}
            legacyBehavior
          >
            <div className={styles.imageButton}>
              <Image
                src={`https:${latestEvent.fields.img.fields.file.url}`}
                alt={latestEvent.title}
                height="170"
                width="270"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>
        <h3>Events</h3>
        <p id="about">
          At WIT, we provide events for students at all levels,
          supporting personal, academic, professional, 
          and social growth. We also connect students with alumni
          and industry sponsors as inspiring role models.
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/events" className={styles.button}>
            See more Events
          </Link>
        </div>
      </div>
      {/*End of first card*/}

      {/*Start of second card*/}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Link
            href={`/media/blog/${latestBlog.fields.blog_no}`}
            legacyBehavior
          >
            <div className={styles.imageButton}>
              <Image
                src={`https:${latestBlog.fields.img.fields.file.url}`}
                alt={latestBlog.fields.heading}
                height="150"
                width="270"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>
        <h3>Blogs</h3>
        <p id="about">
          WIT posts biweekly blogs with industry advice,
          tech trends, and study tips to inspire students
          beyond university. Each week, #WITCrushWednesday
          highlights pioneering women making an impact in STEM."
        </p>
        <div className={styles.buttonContainer}>
          <Link href="media/blog" className={styles.button}>
            See more Blogs
          </Link>
        </div>
      </div>
      {/*End of second card*/}
      
      {/*Start of third card*/}
      {/*added objectFit contain*/ }
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Link href={`${latestPodcast.fields.spotify}`} legacyBehavior>
            <div className={styles.imageButton}>
              <Image
                src={`https:${latestPodcast.fields.img.fields.file.url}`}
                alt={latestPodcast.fields.heading}
                height="180"
                width="200"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>
        <h3>Podcasts</h3>
        <p id="about">
          Each month, WIT hosts guests from diverse backgrounds
          to discuss technology, university, and career paths, 
          aiming to address gender imbalances in tech through 
          shared stories from the industry.
        </p>
        <div className={styles.buttonContainer}>
          <Link href="media/podcast" className={styles.button}>
            See more Episodes
          </Link>
        </div>
      </div>
      {/*End of thid card*/}
    </section>
  );
};

export default EventsSection;

