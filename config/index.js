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
  '^https?:\/\/www\.itjobs\.pt/empresa(.*)',
  '^https?:\/\/www\.itjobs\.pt/oferta(.*)',
];
export const linkedInPaths = [];
export const injectPaths = [...itJobsPaths, ...linkedInPaths];
