import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chip: {
    textTransform: 'capitalize',
    color: 'black',
    margin: '5px',
    radius: '30px',
    width: '204px',
  },
});

const categories = {
  All: 'All',
  Competitions: 'Competitions',
  'Industry Talks': 'Industry Talks',
  Networking: 'Networking',
  Philanthropy: 'Philanthropy',
  Socials: 'Socials',
  Workshops: 'Workshops',
  Programs: 'Programs',
  Other: 'Other',
};

const marks = [
  {
    value: 100,
    scaledValue: 2024,
    label: '2024',
  },
  {
    value: 75,
    scaledValue: 2023,
    label: '2023',
  },
  {
    value: 50,
    scaledValue: 2022,
    label: '2022',
  },
  {
    value: 25,
    scaledValue: 2021,
    label: '2021',
  },
  {
    value: 0,
    scaledValue: 2020,
    label: '2020',
  },
];

const valueToYear = {
  0: '2020',
  25: '2021',
  50: '2022',
  75: '2023',
  100: '2024',
};

const options = [
  {
    value: '2024',
    label: '2024',
  },
  {
    value: '2023',
    label: '2023',
  },
  {
    value: '2022',
    label: '2022',
  },
  {
    value: '2021',
    label: '2021',
  },
  {
    value: '2020',
    label: '2020',
  },
];

export { useStyles, categories, marks, valueToYear, options };
