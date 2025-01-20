// @ts-nocheck comment
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Events.module.css';
import PageHeader from '../components/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScrollUpBtn from '../components/ScrollUpBtn';
import LoadingScreen from '../components/LoadingScreen';
import UpcomingEvent from '../components/UpcomingEvent';
import PaginationComp from '../components/Pagination';
import { isMobile } from 'react-device-detect';
import { categories, valueToYear, options } from '../data/event';
import { loadPastEvents, loadUpcomingEvents } from '../lib/api';
import Head from 'next/head';
import { revalidate } from '../lib/helpers/constants';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Events = ({ upcomingEvents, allPastEvents }: any) => {
  const [year, setYear] = useState(valueToYear[100]);
  const [pastEvents, setPastEvents] = useState({
    term1: [],
    term2: [],
    term3: [],
  });
  const [sourceLoading, setSourceLoading] = useState(true);
  const [loadingPast, setLoadingPast] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  // set how many posts to view per page
  const postsPerPage = 3;
  // current page number
  const [currentPage, setCurrentPage] = useState(1);
  // currently selected category -> default to "All"
  const [selectedCategory, setSelectedCategory] = useState('All');
  // check if category filters result in no results
  const [emptyCategory, setEmptyCategory] = useState(false);
  // all past events of the given year
  const [pastContent, setPastContent] = useState({
    term1: [],
    term2: [],
    term3: [],
  });
  // all past events after being filtered for category
  const [pastSelectedPosts, setPastSelectedPosts] = useState({
    term1: [],
    term2: [],
    term3: [],
  });

  // set the year for the events timeline
  const handleYear = (newYear: string) => {
    setYear(newYear);
    // when year is change, category automatically changes to 'All'
    setSelectedCategory('All');
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // start webpage at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // insert delay for loadingPast during timeline change
  function delay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
  }

  useEffect(() => {
    // show loading signs for past events
    setLoadingPast(true);

    // get past events
    // input: past events data from contentful
    // output: array of dictionaries containing past events data
    async function fetchPastEvents() {
      const allEvents = await allPastEvents.filter(
        (event: any) => event.fields.year === Number(year)
      );

      setTerms(allEvents);
      await delay();
      setLoadingPast(false);
    }

    fetchPastEvents();
  }, [allPastEvents, year]);

  // Takes in events from a given year and separates them by term
  const setTerms = (events: any) => {
    const tempPastEvents = {
      term1: events.filter((event: any) => event.fields.term === 1),
      term2: events.filter((event: any) => event.fields.term === 2),
      term3: events.filter((event: any) => event.fields.term === 3),
    };
    setPastEvents(tempPastEvents);
    setPastSelectedPosts(tempPastEvents);
    setPastContent(tempPastEvents);
  };

  // events archive message
  useEffect(() => {
    const isEmpty = Object.values(pastEvents).every(
      (term) => term.length === 0
    );

    if (isEmpty && loadingPast === false) {
      setEmptyCategory(true);
      console.error = () => { };
    } else {
      setEmptyCategory(false);
    }
  }, [pastEvents, loadingPast]);

  // filter past events of a year by selected category
  const filterContent = (selectedCategory: string) => {
    const filteredContent = {
      term1: filterTerm('term1', selectedCategory),
      term2: filterTerm('term2', selectedCategory),
      term3: filterTerm('term3', selectedCategory),
    };
    setPastSelectedPosts(filteredContent);
    setPastEvents(filteredContent);
  };

  // filter the past events of the given term by the selected category
  const filterTerm = (term: string, selectedCategory: string) => {
    const filteredTerm = pastContent[term].filter(
      (picture: any) =>
        selectedCategory === 'All' ||
        (picture.fields.categories !== null &&
          picture.fields.categories.includes(selectedCategory))
    );

    return filteredTerm;
  };

  // get upcoming events
  // input: upcoming events data from contenful
  // output: array of dictionaries containing upcoming events data
  const fetchUpcomingEvents = async () => {
    setLoadingUpcoming(false);
    setSourceLoading(false);
  };

  // load upcoming events
  useEffect(() => {
    setLoadingUpcoming(true);
    fetchUpcomingEvents().catch((error) =>
      // error handling
      console.error(error)
    );
  }, []);

  // get events for a specific term
  const getTermEvents = (events: any) => {
    return events.map((event: any, index: number) => {
      let eventLabel = event.fields.img.fields.title.split('.')[0].split('-');
      eventLabel.shift();
      let eventId = event.fields.eventNumber;
      let imgUrl = 'https:' + event.fields.img.fields.file.url;
      return (
        <div className={styles.pastEvent} key={index}>
          <Link href={`events/event-recaps/${year}/${eventId}`} legacyBehavior>
            <div className={styles.eventImgBox}>
              <div className={styles.eventImages}>
                <Image
                  src={imgUrl}
                  alt={eventLabel.join(' ')}
                  width="600"
                  height="150"
                />
              </div>
              <div className={styles.darkOverlay} />
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <Head>
        <title>Events | UNSW WIT</title>
      </Head>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Cover Photo */}
          <PageHeader
            imageLoading={setHeaderLoading}
            imgUrl="/headers/events-header.jfif"
            title={'Events'}
          />

          {/* UPCOMING EVENTS */}
          <div className={styles.eventsBody}>
            <h2>UPCOMING EVENTS</h2>
            <div className={styles.eventsLoadingContainer}>
              {loadingUpcoming && (
                <CircularProgress
                  variant="indeterminate"
                  size={50}
                  thickness={5}
                  id={styles.eventsLoading}
                />
              )}
            </div>
            {!loadingUpcoming &&
              (!upcomingEvents.length ? (
                <p className={styles.lookout}>
                  Keep a lookout here for our upcoming events!
                </p>
              ) : (
                <div className={styles.upcomingEventsContainer}>
                  {!isMobile &&
                    upcomingEvents.map((upcomingEvent: any, index: number) => {
                      return (
                        <div className={styles.upcomingEventsBox} key={index}>
                          <UpcomingEvent
                            upcomingEvent={upcomingEvent}
                            key={index}
                          />
                        </div>
                      );
                    })}

                  {isMobile &&
                    upcomingEvents.map((upcomingEvent: any, index: number) => {
                      return (
                        <UpcomingEvent
                          key={index}
                          upcomingEvent={upcomingEvent}
                        />
                      );
                    })}
                </div>
              ))}
            {!isMobile && (
              <PaginationComp
                totalPages={Math.ceil(upcomingEvents.length / postsPerPage)}
                paginate={paginate}
                page={currentPage}
                size="large"
              />
            )}
            {/* PAST EVENTS */}
            <div
              id={styles.pastEventsHeaderContainer}>
              <h2>Past Events</h2>
              <Select
                value={year}
                onChange={(e) => handleYear(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  width: '147px',
                  height: '40px',
                  borderRadius:'12px',
                  backgroundColor: 'transparent',
                }}
                className={styles.pastEventYearselect}
              >
                {options.map((key,index) => {
                    return <MenuItem
                      className={styles.pastEventYearoption}
                      key={index}
                      label={key.value}
                      value={key.value}>
                        <em>{key.value}</em>
                    </MenuItem>;
                  })}
              </Select>
            </div>
            <div className={styles.eventCategories}>
              <div className={styles.contentCategories}
                id={styles.pastEventsButtonsContainer}>
                {Object.keys(categories)
                  .sort((a, b) => {
                    if (a === 'Other') return 1;
                    if (b === 'Other') return -1;
                    return a.localeCompare(b);
                  })
                  .map((category, index) => {
                    return (
                      <button
                        key={index}
                        className={selectedCategory === category ?
                          styles.selectedPastEventsCategoryButton :
                          styles.unselectedPastEventsCategoryButton}
                        onClick={() => {
                          setSelectedCategory(categories[category]);
                          filterContent(categories[category]);
                        }}
                      >{category}</button>
                    );
                  })}
              </div>
              <div>
                {emptyCategory === true && (
                  <p id={styles.emptyMessage}>
                    Keep a lookout for more events!
                  </p>
                )}
              </div>
            </div>
            <div className={styles.eventsLoadingContainer}>
              {loadingPast && (
                <CircularProgress
                  variant="indeterminate"
                  size={50}
                  thickness={5}
                  id={styles.eventsLoading}
                />
              )}
            </div>
            <div className={styles.pastEventsContainer}>
              {!loadingPast &&
                Object.keys(pastSelectedPosts)
                  .reverse()
                  .map((key) => {
                    const numEvents = React.Children.count(
                      getTermEvents(pastSelectedPosts[key])
                    );
                    if (numEvents > 0) {
                      return (
                        <div key={key}>
                          <h3 className={styles.termColour}>
                            TERM {key.replace('term', '')}
                          </h3>
                          <div className={styles.gridContainer}>
                            {getTermEvents(pastSelectedPosts[key])}
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
            </div>
            <ScrollUpBtn />
          </div>
        </>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const allPastEvents = await loadPastEvents();
  const upcomingEvents = await loadUpcomingEvents();
  return {
    props: { allPastEvents, upcomingEvents },
    revalidate: revalidate
  };
}

export default Events;
