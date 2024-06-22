// position of the marks on the timeline (i.e. 250 indicates that it's on the right end)
const marks = [
  {
    value: 249.9,
    scaledValue: 2023,
    label: '2023',
  },
  {
    value: 214.2,
    scaledValue: 2022,
    label: '2022',
  },
  {
    value: 178.5,
    scaledValue: 2021,
    label: '2021',
  },
  {
    value: 142.8,
    scaledValue: 2020,
    label: '2020',
  },
  {
    value: 107.1,
    scaledValue: 2019,
    label: '2019',
  },
  {
    value: 71.4,
    scaledValue: 2018,
    label: '2018',
  },
  {
    value: 35.7,
    scaledValue: 2017,
    label: '2017',
  },
  {
    value: 0,
    scaledValue: 2016,
    label: '2016',
  },
];

const valueToYear = {
  0: '2016',
  35.7: '2017',
  71.4: '2018',
  107.1: '2019',
  142.8: '2020',
  178.5: '2021',
  214.2: '2022',
  249.9: '2023',
};

let pageToValue = (page: string) => {
  return page === 'teams' || page === 'events' || page === 'marketing'
    ? 100
    : 250;
};

const timelinePhoto = {
  2016: '/our-story/timelinePhotos/2016.jpg',
  2017: '/our-story/timelinePhotos/2017.jpg',
  2018: '/our-story/timelinePhotos/2018.jpg',
  2019: '/our-story/timelinePhotos/2019.jpg',
  2020: '/our-story/timelinePhotos/2020.jpg',
  2021: '/our-story/timelinePhotos/2021.jpg',
  2022: '/our-story/timelinePhotos/2022.jpg',
  2023: '/our-story/timelinePhotos/2023.jpg',
};

export { marks, valueToYear, pageToValue, timelinePhoto };
