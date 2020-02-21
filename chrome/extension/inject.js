import { itJobsPaths } from '../../config';
import { ITJobsLoader } from './page/loaders';

const getLoader = () => {
  if (window.location.href.match(itJobsPaths.join('|'))) {
    return new ITJobsLoader();
  }
}

window.addEventListener('load', () => {
  const loader = getLoader();
  loader.loadData();
  console.log('loader: ', loader);
  // const injector = new Injector(loader.data);

  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
});
