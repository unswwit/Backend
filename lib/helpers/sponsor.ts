const filterSponsors = (sponsors: any) => {
  const filteredSponsors = sponsors.filter(
    (sponsor: any) => sponsor.fields.year === 2024
  );
  const tempSponsors = {
    'Diamond Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.fields.type === 'diamond'
    ),
    'Gold Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.fields.type === 'gold'
    ),
    'Silver Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.fields.type === 'silver'
    ),
    'Bronze Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.fields.type === 'bronze'
    ),
    Affiliations: filteredSponsors.filter(
      (sponsor: any) => sponsor.fields.type === 'affiliations'
    ),
    Partnerships: filteredSponsors.filter(
      (sponsor: any) => sponsor.fields.type === 'partnerships'
    ),
  };
  return tempSponsors;
};

export { filterSponsors };
