const execToClassName = {
  2021: 'exec2021Img',
  2020: {
    'Elicia Au Duong': 'eliImg',
    'Gabrielle Younes': 'gabImg',
    'Vivian Wong': 'vivwImg',
    'Alison Chin': 'alisonImg',
    'Felicia Ee': 'felImg',
  },
};

const marks = [
  {
    value: 100,
    scaledValue: 2025,
    label: '2025',
  },
  {
    value: 87.5,
    scaledValue: 2024,
    label: '2024',
  },
  {
    value: 75,
    scaledValue: 2023,
    label: '2023',
  },
  {
    value: 62.5,
    scaledValue: 2022,
    label: '2022',
  },
  {
    value: 50,
    scaledValue: 2021,
    label: '2021',
  },
  {
    value: 37.5,
    scaledValue: 2020,
    label: '2020',
  },
  {
    value: 25,
    scaledValue: 2019,
    label: '2019',
  },
  {
    value: 12.5,
    scaledValue: 2018,
    label: '2018',
  },
  {
    value: 0,
    scaledValue: 2017,
    label: '2017',
  },
];

const valueToYear = {
  0: 2017,
  12.5: 2018,
  25: 2019,
  37.5: 2020,
  50: 2021,
  62.5: 2022,
  75: 2023,
  87.5: 2024,
  100: 2025,
};

export { execToClassName, marks, valueToYear };
