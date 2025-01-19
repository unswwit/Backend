// @ts-nocheck comment
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../../styles/Team.module.css';
import PageHeader from '../../components/Header';
import Execs from '../../components/ExecSection';
import Subcom from '../../components/SubcomSection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Timeline from '../../components/Timeline';
import ScrollUpBtn from '../../components/ScrollUpBtn';
import LoadingScreen from '../../components/LoadingScreen';
import { execToClassName, marks, valueToYear } from '../../data/team';
import { loadSubcommittee, loadExecs, loadDirectors } from '../../lib/api';
import Directors from '../../components/DirectorSection';
import Head from 'next/head';
import { revalidate } from '../../lib/helpers/constants';

const OurTeam = ({ execs, subcommittee, directors }: any) => {
  const masterExec = useRef();
  const masterDirector = useRef();
  const masterSubcom = useRef();
  const [filteredExecs, setFilteredExecs] = useState([]);
  const [filteredDirectors, setFilteredDirectors] = useState([]);
  const [filteredSubcom, setFilteredSubcom] = useState([]);
  const [year, setYear] = useState(2025);
  const [loading, setLoading] = useState(true);
  const [sourceLoading, setSourceLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);

  const handleYear = (newYear: number) => {
    setYear(newYear);
  };

  // get execs
  // input: execs data from Contentful
  // output: array of dictionaries containing exec data
  const fetchExecs = (execs: any) => {
    masterExec.current = execs;
  };

  // get directors
  // input: director data from contentful
  // output: array of dictionaries containing director data
  const fetchDirectors = (directors: any) => {
    masterDirector.current = directors;
  };

  // get subcom
  // input: subcom data from contentful
  // output: array of dictionaries containing subcom data
  const fetchSubcom = (subcom: any) => {
    masterSubcom.current = subcom;
  };

  const filterDataByYear = useCallback(() => {
    // Enable loading spinner
    setLoading(true);

    // Execs
    const tempExecs = masterExec.current.filter(
      (exec: any) => exec.fields.yearJoined === year
    );

    const result = tempExecs.reduce(function (
      result: any,
      _: any,
      index: number,
      tempExecs: any
    ) {
      if (index % 2 === 0) result.push(tempExecs.slice(index, index + 2));
      return result;
    },
    []);
    setFilteredExecs(result);

    // Directors
    const tempDirectors = masterDirector.current.filter(
      (director: any) => director.fields.yearJoined === year
    );
    const resultDir = tempDirectors.reduce(function (
      result: any,
      _: any,
      index: number,
      tempDirectors: any
    ) {
      if (index % 2 === 0) result.push(tempDirectors.slice(index, index + 2));
      return result;
    },
    []);
    setFilteredDirectors(resultDir);

    // Subcom
    const subcom = masterSubcom.current.filter(
      (subcom: any) => subcom.fields.yearJoined === year
    );
    setFilteredSubcom(subcom);

    // Disable loading spinner
    setLoading(false);
  }, [year]);

  // Scroll to the top of the page on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // show loading sign for team page
    setLoading(true);
    const fetchDataPromises = [
      fetchSubcom(subcommittee),
      fetchExecs(execs),
      fetchDirectors(directors),
    ];
    Promise.all(fetchDataPromises).then(() => {
      filterDataByYear();
      setSourceLoading(false);
    });
  }, [filterDataByYear, directors, execs, subcommittee]);

  // Moved from teamData.js to prevent new portfolios
  // from showing when the year is earlier than 2021.
  const sectors =
    year === 2025
    ? [
      'Careers',
      'Competitions',
      'Education',
      'Human Resources',
      'Information Technology',
      'Marketing',
      'Media',
      'Publications',
      'Socials',
      'Sponsorships',
    ]
   : year === 2024
      ? [
          'Careers',
          'Competitions',
          'Education',
          'Human Resources',
          'Information Technology',
          'Marketing',
          'Media',
          'Publications',
          'Socials',
          'Sponsorships',
        ]
    : year === 2023
      ? [
          'Careers',
          'Competitions',
          'Human Resources',
          'Information Technology',
          'Marketing',
          'Media',
          'Publications',
          'Socials',
          'Sponsorships',
        ]
      : year < 2022
      ? [
          'Events',
          'Externals',
          'Human Resources',
          'Education',
          'Marketing',
          'Information Technology',
        ]
      : [
          'Careers',
          'Competitions',
          'Externals',
          'Human Resources',
          'Information Technology',
          'Marketing',
          'Media',
          'Publications',
        ];

  return (
    <div>
      <Head>
        <title>Our Team | UNSW WIT</title>
      </Head>
      {sourceLoading && headerLoading ? (
        <LoadingScreen />
      ) : (
        <div id={styles.pageContainer}>
          {/* Cover Photo */}
          <PageHeader
            imgUrl="/headers/2022-roadtrip-header.jpeg"
            title="Our Team"
            imageLoading={setHeaderLoading}
          />

          {/* Timeline - should be as close to 100 as possible */}
          <Timeline
            margin={'50px'}
            page={'teams'}
            step={14.2}
            valueToYear={valueToYear}
            marks={marks}
            updateYear={handleYear}
          />

          <div id={styles.teamLoadingContainer}>
            {loading && (
              <CircularProgress
                variant="indeterminate"
                size={50}
                thickness={5}
                id={styles.teamLoading}
              />
            )}
          </div>

          {!loading && (
            <>
              {/* Exec section */}
              <h2 className={styles.teamHeading} id={styles.topHeading}>
                OUR {year} EXECUTIVE TEAM
              </h2>

              <div className={styles.allExecsSection}>
                <div className={styles.execRow}>
                  {filteredExecs.map((row, index) => {
                    return (
                      <div key={index} className={styles.execRow}>
                        {row.map((exec: any, index: number) => {
                          return (
                            <Execs
                              key={index}
                              imgUrl={'http:' + exec.fields.img.fields.file.url}
                              name={exec.fields.name}
                              pronouns={exec.fields.pronouns}
                              className={
                                exec.fields.year === 2020
                                  ? execToClassName[exec.fields.year][
                                      exec.fields.name
                                    ]
                                  : execToClassName[exec.fields.year]
                              }
                              position={exec.fields.position}
                              degree={exec.fields.degree}
                              year={exec.fields.year}
                              linkedin={exec.fields.linkedin}
                              fb={exec.fields.facebook}
                              email={exec.fields.email}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Director section */}
              {filteredDirectors.length ? (
                <>
                  <h2 className={styles.teamHeading} id={styles.topHeading}>
                    OUR {year} DIRECTOR TEAM
                  </h2>

                  <div className={styles.allExecsSection}>
                    <div className={styles.execRow}>
                      {filteredDirectors.map((row, index) => {
                        return (
                          <div key={index} className={styles.execRow}>
                            {row.map((director: any, index: number) => {
                              return (
                                <Directors
                                  key={index}
                                  imgUrl={
                                    'http:' +
                                    director.fields.img.fields.file.url
                                  }
                                  name={director.fields.name}
                                  pronouns={director.fields.pronouns}
                                  position={director.fields.position}
                                  degree={director.fields.degree}
                                  year={director.fields.year}
                                  email={director.fields.email}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}

              {/* Subcommittee section */}
              {filteredSubcom.length ? (
                <>
                  <h2 className={styles.teamHeading}>
                    OUR {year} SUBCOMMITTEE TEAM
                  </h2>

                  <div className={styles.subcomSection}>
                    {sectors.map((sector) => {
                      return (
                        <div key={sector}>
                          <h3 className={styles.subcomType}>{sector} Team</h3>
                          {filteredSubcom
                            .filter((member) => member.fields.team === sector)
                            .map((member, index) => {
                              const { name, degree, year } = member.fields;
                              return (
                                <Subcom
                                  key={index}
                                  name={name}
                                  degree={degree}
                                  year={year}
                                />
                              );
                            })}
                          <br />
                          <br />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </>
          )}
          <ScrollUpBtn />
        </div>
      )}
    </div>
  );
};

export default OurTeam;

export async function getStaticProps() {
  const subcommittee = await loadSubcommittee();
  const execs = await loadExecs();
  const directors = await loadDirectors();
  return {
    props: { subcommittee, execs, directors },
    revalidate: revalidate
  };
}
