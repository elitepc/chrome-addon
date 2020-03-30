export const teamlyzerUrl = 'https://pt.teamlyzer.com';
export const blogUrl = 'https://blog.teamlyzer.com/';
export const teamlyzerApi = {
  host: 'https://pt.teamlyzer.com/api',
  auth: {
    username: process.env.TEAMLYZER_USERNAME,
    password: process.env.TEAMLYZER_PASSWORD,
  }
};


export const itJobsPaths = [
  '^https?://www.itjobs.pt/empresa(.*)',
  '^https?://www.itjobs.pt/oferta(.*)',
];
export const linkedInPaths = [
  '^https?://www.linkedin.com/(.*)',
];
export const landingJobsPaths = [
  '^https?://landing.jobs/(.*)',
];
export const injectPaths = [...itJobsPaths, ...linkedInPaths, ...landingJobsPaths];

export const colors = {
  white: '#FFF',
  green: '#59b287',
  red: '#fc4e03',
  primary: '#337ab7',
  primaryFade: '#ebf2f8',
  darkBackground: '#101820',
  darkForeground: '#878b8f',
  lightBackground: '#FFF',
  lightForeground: '#FFF',
};
