export const navigation = [
  {
    id: 0,
    title: "Home",
    url: "/",
  },
  {
    id: 1,
    title: "Discover",
    url: "/discover",
  },
  {
    id: 2,
    title: "Tags",
    url: "/tags",
  },
  {
    id: 3,
    title: "Private Shows",
    url: "/streams/private",
  },
  {
    id: 4,
    title: "Following",
    url: "/profile/following",
  },
  {
    id: 5,
    title: "Merch",
    url: "/merch",
  }
];
export const categories = [
  {
    id: 0,
    title: "Featured",
  },
  {
    id: 1,
    title: "Men",
  },
  {
    id: 2,
    title: "Women",
  },
  {
    id: 3,
    title: "couples",
  },
  {
    id: 4,
    title: "trans",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Basic Package",
    icon: "/free-plan.svg",
    price: 20,
    credits: 50,
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/free-plan.svg",
    price: 40,
    credits: 100,
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/free-plan.svg",
    price: 199,
    credits: 2000,
  },
];

export const locations = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
].sort((a, b) => a.label.localeCompare(b.label));

export enum Preference {
  MEN = "Men",
  WOMEN = "women",
  OTHERS = "others",
  UNKNOWN = "Prefer not to say",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHERS = "others",
  UNKNOWN = "Prefer not to say",
}

export const years = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
];

export const decades = [
  "1990s",
  "1980s",
  "1970s",
  "1960s",
  "1950s",
  "1940s",
  "1930s",
  "1920s",
  "1910s",
  "1900s",
];

export const genres = [
  "Action",
  "Action & Adventure",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Kids",
  "Music",
  "Mystery",
  "News",
  "Reality",
  "Romance",
  "Sci-Fi & Fantasy",
  "Science Fiction",
  "Soap",
  "Talk",
  "Thriller",
  "TV Movie",
  "War",
  "War & Politics",
  "Western",
];

export const countries = [
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Czech Republic",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Hong Kong",
  "Hungary",
  "India",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Luxembourg",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Romania",
  "Russia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "United Kingdom",
  "United States of America",
];
