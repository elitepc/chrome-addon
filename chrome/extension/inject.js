import { itJobsPaths, linkedInPaths, landingJobsPaths } from '../../config';
import { ITJobsLoader, LinkedInLoader, LandingJobsLoader } from './page/scrappers';
import { ITJobsInjector, LinkedInInjector, LandingJobsInjector } from './page/injectors';

const getLoader = () => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsLoader();
  }
  if (window.location.href.match(linkedInPaths.join('|'))) {
    return new LinkedInLoader();
  }
  if (window.location.href.match(landingJobsPaths.join('|'))) {
    return new LandingJobsLoader();
  }
};

const getInjector = (loader) => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsInjector(loader);
  }
  if (window.location.href.match(linkedInPaths.join('|'))) {
    return new LinkedInInjector(loader);
  }
  if (window.location.href.match(landingJobsPaths.join('|'))) {
    return new LandingJobsInjector(loader);
  }
};

window.addEventListener('load', () => {
  const loader = getLoader();
  const injector = getInjector(loader);
  injector.init();
});
