export const teamlyzerUrl = 'https://pt.teamlyzer.com';
export const blogUrl = 'https://blog.teamlyzer.com/';

export const itJobsPaths = [
  '^https?:\/\/www\.itjobs\.pt/empresa(.*)',
  '^https?:\/\/www\.itjobs\.pt/oferta(.*)',
];
export const linkedInPaths = [];
export const injectPaths = [...itJobsPaths, ...linkedInPaths];
