// @ts-nocheck comment
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';
import styles from '../styles/Home.module.css';
import PubArticle from '../components/PublicationsArticle';
import InitiativesSlideshow from '../components/InitiativesSlideshow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Aos from 'aos';
import { isMobile } from 'react-device-detect';
import 'aos/dist/aos.css';
import LoadingScreen from '../components/LoadingScreen';
import NewsletterSection from '../components/NewsletterSection';
import QuoteSlideshow from '../components/QuotesSlideshow';
import {
  loadLatestPublications,
  loadLatestBlog,
  loadNextUpcomingEvent,
  loadLatestEvent,
  loadLatestPodcast,
  loadExecQuotes,
  loadSponsors,
} from '../lib/api';
import SponsorCollage from '../components/SponsorCollage';
import { filterSponsors } from '../lib/helpers/sponsor';
import Head from 'next/head';

const Home = ({
  latestPubs,
  latestBlog,
  nextEvent,
  latestEvent,
  latestPodcast,
  execQuotes,
  sponsors,
}: any) => {
  const [loading, setLoading] = useState(true);
  const [openNewsletter, setOpenNewsletter] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(true);
  const tempSponsors = filterSponsors(sponsors);

  // close newsletter
  const callbackModal = () => {
    setOpenNewsletter(false);
  };

  // start webpage at the top
  useEffect(() => {
    Aos.init({
      duration: 1300,
      once: true,
      anchorPlacement: 'top-bottom',
      easing: 'ease-in-out',
      offset: 20,
    });
  }, []);

  useEffect(() => {
    setLoading(false);
    setSourceLoading(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Home | UNSW WIT</title>
      </Head>
      {sourceLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          {/* Start of Header */}
          <div className={styles.contain}>
            <img
              className={styles.headerImage}
              src={'/headers/2022-team-header.jpg'}
              layout="fill"
              alt="header"
            />
            <div data-aos="fade" className={styles.headline}>
              <h1>UNSW</h1>
              <h1>Women In</h1>
              <h1>Technology</h1>
              <p> Empowering and inspiring the architects of change</p>
              <button>
                <Link href="/join-us">JOIN US</Link>
              </button>
            </div>
          </div>
          {/* End of Header */}
          {/* Start of Description */}
          <div
            data-aos={isMobile ? 'fade' : 'fade-up'}
            className={styles.description}
          >
            <div className={styles.descriptionLeft}>
              <h1>COLLABORATE. INSPIRE. CHANGE.</h1>
            </div>
            <div className={styles.descriptionRight}>
              <p>
                Formed in late 2016, we have grown to be a platform that
                empowers, unites and up-skills female and male students alike
                that are passionate about our mission. Women in Technology (WIT)
                aims to cultivate future leaders that are prepared to challenge
                the prejudices and bring change into the industry while building
                a strong community where they can find lasting friendships and
                support.
              </p>
            </div>
          </div>
          {/* End of Description */}
          {/* Start of Quotes */}
          <div
            data-aos={isMobile ? 'fade' : 'fade-up'}
            className={styles.quotes}
          >
            <h1>HEAR FROM US</h1>
            <div className={[styles.carousel, styles.quoteCarousel].join(' ')}>
              <QuoteSlideshow
                height={450}
                data={execQuotes}
                homeLeftArrow={styles.homeLeftArrow}
                homeRightArrow={styles.homeRightArrow}
              />
            </div>
          </div>
          {/* End of Quotes */}
          {/* Start of Statistics */}
          <div className={styles.stats}>
            <img
              src="/stats-background-1.png"
              className={styles.statsBackground}
              alt="banner"
              layout="fill"
            />
            <div>
              <div data-aos="fade" className={styles.number}>
                <div>
                  <CountUp end={55} duration={5} />
                  <p>Team Members</p>
                </div>
                <div>
                  <CountUp end={28} duration={5} />
                  <p>Sponsors</p>
                </div>
                <div>
                  <CountUp end={3021} duration={4} />
                  <p>Facebook Followers</p>
                </div>
              </div>
            </div>
          </div>
          {/* End of Statistics */}
          {/* Start of Upcoming Events / Latest blog / Latest podcast*/}
          <div
            data-aos={isMobile ? 'fade' : 'fade-up'}
            data-aos-delay="150"
            className={styles.carousel}
          >
            <InitiativesSlideshow
              latestBlog={latestBlog}
              nextEvent={nextEvent}
              latestEvent={latestEvent}
              latestPodcast={latestPodcast}
            />
          </div>
          {/* Start of Publications */}
          <div
            data-aos={isMobile ? 'fade' : 'fade-up'}
            data-aos-delay="150"
            className={styles.publications}
          >
            <h1>PUBLICATIONS</h1>
            <div className={styles.articlesDiv}>
              <div className={styles.articles}>
                {loading && (
                  <CircularProgress
                    variant="indeterminate"
                    size={50}
                    thickness={5}
                    id={styles.publicationsLoading}
                  />
                )}
                {!loading &&
                  latestPubs.map((article, index) => (
                    <div className={styles.homeArticles} key={index}>
                      <PubArticle
                        imgUrl={'http:' + article.fields.img.fields.file.url}
                        heading={article.fields.heading}
                        date={article.fields.date}
                        url={article.fields.url}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <button className={styles.pubBtn}>
              <Link href="/media/publications">see more publications</Link>
            </button>
          </div>
          {/* End of Publications */}
          {/* Start of Sponsors & Affliations */}
          <div
            data-aos={isMobile ? 'fade' : 'fade-up'}
            data-aos-delay="150"
            className={styles.sponsors}
          >
            <h1>SPONSORS AND AFFILIATIONS</h1>
            <div id={styles.sponsorsContainer}>
              <SponsorCollage tempSponsors={tempSponsors} />
            </div>
          </div>
          {/* End of Sponsors & Affliations */}
          {/* Start of Newsletter */}
          <NewsletterSection
            setOpen={setOpenNewsletter}
            open={openNewsletter}
            callbackModal={callbackModal}
            fade={false}
          />
          {/* End of Newsletter */}
        </div>
      )}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const latestPubs = await loadLatestPublications();
  const latestBlog = (await loadLatestBlog())[0];
  const nextEvent = (await loadNextUpcomingEvent())[0]
    ? (await loadNextUpcomingEvent())[0]
    : null;
  const latestEvent = (await loadLatestEvent())[0];
  const latestPodcast = (await loadLatestPodcast())[0];
  const execQuotes = await loadExecQuotes();
  const sponsors = await loadSponsors();
  return {
    props: {
      latestPubs,
      latestBlog,
      nextEvent,
      latestEvent,
      latestPodcast,
      execQuotes,
      sponsors,
    },
  };
}
