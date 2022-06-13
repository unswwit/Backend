import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import PubArticle from "../components/publications-article";
import InitiativesSlideshow from "../components/InitiativesSlideshow.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Aos from "aos";
import { isMobile } from "react-device-detect";
import "aos/dist/aos.css";
import LoadingScreen from "../components/LoadingScreen";
import NewsletterSection from "../components/NewsletterSection";
import axios from "axios";
import humps from "humps";
import QuoteSlideshow from "../components/QuotesSlideshow.js";
import executives from "../data/ExecQuotes";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import Image from "next/image";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sourceLoading, setSourceLoading] = useState(true);
  const last3articles = articles.slice(0, 3);

  //start webpage at the top
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1300,
      once: true,
      anchorPlacement: "top-bottom",
      easing: "ease-in-out",
      offset: 20,
    });
  }, []);

  // get publications
  // input: publications data from google sheets
  // output: array of dictionaries containing publications data
  const fetchPublications = async () => {
    const res = await axios.get(
      "https://wit-database.herokuapp.com/publications"
    );
    setArticles(humps.camelizeKeys(res.data).reverse());
    setLoading(false);
    setSourceLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchPublications().catch((error) =>
      // error handling
      console.error(error)
    );
  }, []);

  const callbackModal = () => {
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.contain}>
          <div data-aos="fade" className={styles.headline}>
            <h1>UNSW</h1>
            <h1>Women In</h1>
            <h1>Technology</h1>
            <p> Empowering and inspiring the architects of change</p>
            <button>
              <href to="/join-us">JOIN US</href>
            </button>
          </div>
        </div>
        {/* End of Header */}

        {/* Start of Description */}
        <div
          data-aos={isMobile ? "fade" : "fade-right"}
          className={styles.description}
        >
          <div className={styles.descriptionLeft}>
            <h1>COLLABORATE. INSPIRE. CHANGE.</h1>
          </div>
          <div className={styles.descriptionRight}>
            <p>
              Formed in late 2016, we have grown to be a platform that empowers,
              unites and up-skills female and male students alike that are
              passionate about our mission. Women in Technology (WIT) aims to
              cultivate future leaders that are prepared to challenge the
              prejudices and bring change into the industry while building a
              strong community where they can find lasting friendships and
              support.
            </p>
          </div>
        </div>
        {/* End of Description */}
        {/* Quotes */}
        <div
          data-aos={isMobile ? "fade" : "fade-left"}
          className={styles.quotes}
        >
          <h1>HEAR FROM US</h1>
          <div className={[styles.carousel, styles.quoteCarousel].join(" ")}>
            <QuoteSlideshow
              height={450}
              data={executives}
              homeLeftArrow={styles.homeLeftArrow}
              homeRightArrow={styles.homeRightArrow}
            />
          </div>
        </div>

        {/* Start of Statistics */}
        <div className={styles.stats}>
          <img
            src="/stats-background-1.png"
            className={styles.statsBackground}
            alt="stats-background"
          />
          <div>
            <div className={styles.number}>
              <div>
                <CountUp end={47} duration={5} />
                <p>Team Members</p>
              </div>
              <div>
                <CountUp end={23} duration={5} />
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

        <div
          data-aos={isMobile ? "fade" : "fade-right"}
          data-aos-delay="150"
          className={styles.sponsors}
        >
          <h1>SPONSORS AND AFFILIATIONS</h1>
          <div id={styles.sponsorsContainer}>
            <Image
              src="/sponsors-collage-light-mode.png"
              alt="light mode banner"
              margin-top="50px"
              width="900px"
              height="650px"
              display="unset"
              className={styles.lightmodeBanner}
            />

            {/* UNABLE TO MAKE DARK MODE WORK <Image
              display="none"
              src="/sponsors-collage-dark-mode.png"
              alt="dark mode banner"
              margin-top="50px"
              width="900px"
              height="650px"
              className={styles.darkmodeBanner}
              />*/}
          </div>
        </div>
        {/* Start of newsletter */}
        <NewsletterSection
          setOpen={setOpen}
          open={open}
          callbackModal={callbackModal}
          fade={true}
        />
        {/* End of Newsletter */}
      </main>
    </div>
  );
}
