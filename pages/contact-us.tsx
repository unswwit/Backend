// @ts-nocheck comment
import { useEffect, useState } from 'react';
import PageHeader from '../components/Header';
import ContactForm from '../components/ContactForm';
import styles from '../styles/ContactUs.module.css';
import LoadingScreen from '../components/LoadingScreen';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

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
              <h2 className={styles.contactTeam}>Looking for Someone Specific?</h2>
              <div className={styles.grid}>
                <div className={styles.profile}>
                  <Image
                    src="/icons/pres-icon.png"
                    alt="pres-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Brianna Kim</h3>
                  <Link href="mailto:president@unswwit.com">
                    president@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/pres-icon.png"
                    alt="pres-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Vivian Wang</h3>
                  <Link href="mailto:president@unswwit.com">
                    president@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/sec-icon.png"
                    alt="sec-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Yuhan Zhou</h3>
                  <Link href="mailto:secretary@unswwit.com">
                    secretary@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/tr-icon.png"
                    alt="tr-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Abigail Joesan Johan</h3>
                  <Link href="mailto:treasurer@unswwit.com">
                    treasurer@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/ex-icon.png"
                    alt="ex-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Emily Dang</h3>
                  <Link href="mailto:externals@unswwit.com">
                    externals@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/int-icon.png"
                    alt="int-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Abarna Ravindran</h3>
                  <Link href="mailto:internals@unswwit.com">
                    internals@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/tech.png"
                    alt="it-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Joanna He</h3>
                  <Link href="mailto:technology@unswwit.com">
                    technology@unswwit.com
                  </Link>
                </div>
                <div className={styles.profile}>
                  <Image
                    src="/icons/multi-icon.png"
                    alt="multi-icon"
                    width="50"
                    height="50"
                  />
                  <h3>Chelsea Chaffey</h3>
                  <Link href="mailto:multimedia@unswwit.com">
                    multimedia@unswwit.com
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.form}>
              <ContactForm />
            </div>

          </div>

          {/* <div className={styles.newEmails}>
            <div className={styles.col2}>
              <div className={styles.profile}>
                <Image
                  src="/icons/pres-icon.png"
                  alt="pres-icon"
                  width="50"
                  height="50"
                />
                <h3>Brianna Kim</h3>
                <Link href="mailto:president@unswwit.com">
                  president@unswwit.com
                </Link>
              </div>
              <div className={styles.profile}>
                <Image
                  src="/icons/pres-icon.png"
                  alt="pres-icon"
                  width="50"
                  height="50"
                />
                <h3>Vivian Wang</h3>
                <Link href="mailto:president@unswwit.com">
                  president@unswwit.com
                </Link>
              </div>
              <div className={styles.profile}>
                <Image
                  src="/icons/sec-icon.png"
                  alt="sec-icon"
                  width="50"
                  height="50"
                />
                <h3>Yuhan Zhou</h3>
                <Link href="mailto:secretary@unswwit.com">
                  secretary@unswwit.com
                </Link>
              </div>
              <div className={styles.profile}>
                <Image
                  src="/icons/tr-icon.png"
                  alt="tr-icon"
                  width="50"
                  height="50"
                />
                <h3>Abigail Joesan Johan</h3>
                <Link href="mailto:treasurer@unswwit.com">
                  treasurer@unswwit.com
                </Link>
              </div>
            </div>

            <hr
              className={[styles.lineBreak, styles.solid].join(' ')}
              width="90%"
            />
            <div className={styles.col3}>
              <div className={styles.profile}>
                <Image
                  src="/icons/ex-icon.png"
                  alt="ex-icon"
                  width="50"
                  height="50"
                />
                <h3>Emily Dang</h3>
                <Link href="mailto:externals@unswwit.com">
                  externals@unswwit.com
                </Link>
              </div>
              <div className={styles.profile}>
                <Image
                  src="/icons/int-icon.png"
                  alt="int-icon"
                  width="50"
                  height="50"
                />
                <h3>Abarna Ravindran</h3>
                <Link href="mailto:internals@unswwit.com">
                  internals@unswwit.com
                </Link>
              </div>
              <div className={styles.profile}>
                <Image
                  src="/icons/tech.png"
                  alt="it-icon"
                  width="50"
                  height="50"
                />
                <h3>Joanna He</h3>
                <Link href="mailto:technology@unswwit.com">
                  technology@unswwit.com
                </Link>
              </div>
              <div className={styles.profile}>
                <Image
                  src="/icons/multi-icon.png"
                  alt="multi-icon"
                  width="50"
                  height="50"
                />
                <h3>Chelsea Chaffey</h3>
                <Link href="mailto:multimedia@unswwit.com">
                  multimedia@unswwit.com
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      )
      }
    </div >
  );
};

export default ContactUs;
