// @ts-nocheck comment
import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from 'semantic-ui-react';
import styles from '../../styles/Sponsors.module.css';
import PageHeader from '../../components/Header';
import SponsorsModal from '../../components/SponsorModal';
import LoadingScreen from '../../components/LoadingScreen';
import Link from 'next/link';
import Head from 'next/head';
import { loadSponsors } from '../../lib/api';
import { filterSponsors } from '../../lib/helpers/sponsor';
import { revalidate } from '../../lib/helpers/constants';

export default function Sponsors({ sponsors }: any) {
  const [open, setOpen] = React.useState(false);
  const [currSponsorType, setCurrSponsorType] = React.useState('');
  const [currSponsor, setCurrSponsor] = React.useState('');
  const [sourceLoading, setSourceLoading] = React.useState(true);
  const [headerLoading, setHeaderLoading] = React.useState(true);
  const [currSponsorCategory, setCurrSponsorCategory] = React.useState('All Sponsors');

  const tempSponsors = filterSponsors(sponsors);

  // control when to stop loading
  useEffect(() => {
    setTimeout((loading) => {
      if (!loading) {
        setSourceLoading(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchSponsors(sponsors);
  }, [sponsors]);

  const callbackModal = () => {
    setOpen(false);
  };

  // get sponsors
  // input: sponsors data from contentful
  // output: array of dictionaries containing sponsors data
  const fetchSponsors = async () => {
    setSourceLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Sponsors | UNSW WIT</title>
      </Head>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          {/* Cover Photo */}
          <PageHeader
            imgUrl="/headers/sponsors-header-2.jpg"
            title="Sponsors"
            imageLoading={setHeaderLoading}
          />

          <div id={styles.sponsorsBody}>
            <p className={styles.subheader}>
              Thank you to our sponsors for generously supporting our cause and
              collaborating with us to provide our students invaluable
              opportunities.
            </p>

            <p className={styles.subheader}>
              Interested in partnering with us? Contact us at{' '}
              <Link
                href="mailto:sponsorships@unswwit.com"
                className={styles.subheader}
              >
                sponsorships@unswwit.com
              </Link>
            </p>

            {/* Start of Sponsors Section */}
            <h2 className={styles.subsponsor}>{currSponsorCategory}</h2>
            <div id={styles.sponsorButtonsContainer}>
              <button
                className={currSponsorCategory === 'All Sponsors' ? 
                styles.selectedSponsorButton : styles.unselectedSponsorButton}
                onClick={() => {
                  setCurrSponsorCategory('All Sponsors');
                }}>All Sponsors</button>
              {Object.keys(tempSponsors).map((sponsorType, index) => {
                const curType = sponsorType.split(' ')[0];
                return <button
                  className={currSponsorCategory === sponsorType ? 
                    styles.selectedSponsorButton : styles.unselectedSponsorButton}
                  key={index}
                  onClick={() => {
                    setCurrSponsorCategory(sponsorType);
                  }}
                >{curType}</button>;
              })}
            </div>
            <div id={styles.majorContainer}>
              {Object.keys(tempSponsors).map((sponsorType) => {
                const curType = sponsorType.split(' ')[0];
                return <>{
                  (currSponsorCategory === sponsorType ||
                    currSponsorCategory === 'All Sponsors') &&
                  tempSponsors[sponsorType].map((sponsor, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={`${styles.logo} ${styles[`logo${curType}`]}`}
                      src={
                        window.matchMedia &&
                          window.matchMedia('(prefers-color-scheme: dark)')
                            .matches
                          ? 'https:' +
                          sponsor.fields.darkModeLogo.fields.file.url
                          : 'https:' +
                          sponsor.fields.lightModeLogo.fields.file.url
                      }
                      alt={sponsor.fields.name}
                      onClick={() => {
                        setOpen(true);
                        setCurrSponsorType(sponsorType);
                        setCurrSponsor(sponsor);
                      }}
                      key={index}
                    />
                  ))
                }
                </>;
              })}
            </div>
          </div>

          {/* Start of Modal */}
          <div className={styles.modalContainer}>
            <Modal
              className={styles.modal}
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={open}
              onClose={() => setOpen(false)}
              trigger={<Button>Scrolling Content Modal</Button>}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <>
                <Fade in={open}>
                  <SponsorsModal
                    handleClose={callbackModal}
                    sponsorType={currSponsorType}
                    sponsor={currSponsor}
                  />
                </Fade>
              </>
            </Modal>
          </div>
          {/* End of Modal */}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const sponsors = await loadSponsors();
  return {
    props: { sponsors },
    revalidate: revalidate
  };
}
