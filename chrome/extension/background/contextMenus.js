import { teamlyzerUrl } from '../../../config';

const URL_PATTERNS = [
  `${teamlyzerUrl}/*`,
  'https://www.itjobs.pt/*',
  'https://www.linkedin.com/*',
  'https://landing.jobs/*',
];
const CONTEXT_MENU_ID = 'TL_context';
const CREATE_REVIEW_MENU_ID = 'TL_create_menu';

function openUrl(url) {
  chrome.tabs.create({ url: `${teamlyzerUrl}${url}` });
}

chrome.contextMenus.create({
  id: CONTEXT_MENU_ID,
  title: 'Teamlyzer',
  contexts: ['all'],
  documentUrlPatterns: URL_PATTERNS,
});
chrome.contextMenus.create({
  parentId: CONTEXT_MENU_ID,
  id: CREATE_REVIEW_MENU_ID,
  title: 'Criar nova review',
  contexts: ['all'],
  documentUrlPatterns: URL_PATTERNS,
});
chrome.contextMenus.create({
  parentId: CREATE_REVIEW_MENU_ID,
  id: 'tl_review_job',
  title: 'Criar review de emprego',
  contexts: ['all'],
  documentUrlPatterns: URL_PATTERNS,
  onclick: () => openUrl('/users/job-review/step1'),
});
chrome.contextMenus.create({
  parentId: CREATE_REVIEW_MENU_ID,
  id: 'tl_review_interview',
  title: 'Criar review de entrevista',
  contexts: ['all'],
  documentUrlPatterns: URL_PATTERNS,
  onclick: () => openUrl('/users/interview-review/step1'),
});
chrome.contextMenus.create({
  parentId: CREATE_REVIEW_MENU_ID,
  id: 'tl_review_salary',
  title: 'Criar review de salário',
  contexts: ['all'],
  documentUrlPatterns: URL_PATTERNS,
  onclick: () => openUrl('/users/salary-review'),
});
chrome.contextMenus.create({
  parentId: CONTEXT_MENU_ID,
  id: 'tl_create_company',
  title: 'Criar nova empresa',
  contexts: ['all'],
  documentUrlPatterns: URL_PATTERNS,
  onclick: () => openUrl('/companies/new-company'),
});
