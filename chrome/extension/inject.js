import { itJobsPaths, linkedInPaths } from '../../config';
import { ITJobsLoader, LinkedInLoader } from './page/scrappers';
import { ITJobsInjector, LinkedInInjector } from './page/injectors';

const getLoader = () => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsLoader();
  }
  if (window.location.href.match(linkedInPaths.join('|'))) {
    return new LinkedInLoader();
  }
};

const getInjector = (loader) => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsInjector(loader);
  }
  if (window.location.href.match(linkedInPaths.join('|'))) {
    return new LinkedInInjector(loader);
  }
};

window.addEventListener('load', () => {
  const loader = getLoader();
  const injector = getInjector(loader);
  injector.init();
});
