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
  '^https?://www.linkedin.com/company(.*)',
  '^https?://www.linkedin.com/jobs/view(.*)',
  '^https?://www.linkedin.com/search(.*)',
];
export const injectPaths = [...itJobsPaths, ...linkedInPaths];

export const colors = {
  white: '#FFF',
  green: '#59b287',
  red: '#fc4e03',
  primary: '#59b287',
  primaryFade: '#13231b',
  darkBackground: '#101820',
  darkForeground: '#878b8f',
  lightBackground: '#FFF',
  lightForeground: '#FFF',
};
