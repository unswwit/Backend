// @ts-nocheck comment
import { useEffect, useState } from 'react';
import PageHeader from '../components/Header';
import ContactForm from '../components/ContactForm';
import styles from '../styles/ContactUs.module.css';
import LoadingScreen from '../components/LoadingScreen';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import profiles from '../data/contact-us'

const ContactUs = () => {
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // control when to stop loading
  useEffect(() => {
    setTimeout(() => {
      setSourceLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Head>
        <title>Contact Us | UNSW WIT</title>
      </Head>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          {/* Cover Photo */}
          <PageHeader
            imgUrl="/headers/2023-exec-header.jpg"
            title="Contact Us"
            imageLoading={setHeaderLoading}
          />

          <div className={styles.sections}>
            <div className={styles.team}>
              <h2 className={styles.contactTeam}>
                Looking for Someone Specific?
              </h2>
              <div className={styles.grid}>
                {profiles.map((profile) => (
                  <div className={styles.profile}>
                    <Image
                      src={profile.src}
                      alt={profile.alt}
                      width="50"
                      height="50"
                    />
                    <h3>{profile.name}</h3>
                    <Link
                      href={profile.mailto}
                    >{profile.mail}</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.form}>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default ContactUs;
