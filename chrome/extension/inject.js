import { itJobsPaths } from '../../config';
import { ITJobsLoader } from './page/scrappers';
import { ITJobsInjector } from './page/injectors';

const getLoader = () => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsLoader();
  }
};

const getInjector = (loader) => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsInjector(loader);
  }
};

window.addEventListener('load', () => {
  const loader = getLoader();
  const injector = getInjector(loader);
  injector.init();
});
