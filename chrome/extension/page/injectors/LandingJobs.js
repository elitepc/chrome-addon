import debounce from 'lodash/debounce';
import { Base } from './Base';

const ratingElSelector = {
  jobOfferPage: '[class^="Title-module_secondLine"]',
  companyPage: 'h1[class^="CompanyPage-module_title"]',
};
const salaryElSelector = {
  jobOfferPage: '[class^="Header-module_wrapper"]',
};
const detailsElSelector = {
  jobOfferPage: '[class^="JobPage-module_rightSide"]',
  companyPage: 'aside[class^="Sidebar-module_sidebar"]',
};

export class LandingJobsInjector extends Base {
  constructor(loader) {
    super(loader);

    this.isLoading = false;

    const debouncedObserveBoot = debounce(this.observeBoot.bind(this), 100);
    this.bootObserver = new MutationObserver(debouncedObserveBoot);
  }

  observeBoot() {
    if (!this.injecting) {
      const pageChangeLoader = document.querySelector('.lj-spinner');
      const loadingElement = document.querySelector('div[class^="spinner-module"]');
      if (!loadingElement && pageChangeLoader.classList.contains('lj-spinner--stopped')) {
        this.isLoading = false;
        if (
          (this.isCompanyPage() && !this.ratingInjected && !this.detailsInjected && !this.injecting)
        ) {
          this.cleanup();
          this.inject();
        }
        if (
          (this.isJobOfferPage() && !this.ratingInjected && !this.salaryInjected && !this.detailsInjected && !this.injecting)
        ) {
          this.cleanup();
          this.inject();
        }
      } else {
        this.isLoading = true;
      }
    }
  }

  startBootObserver() {
    this.bootObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  isCompanyPage(path) {
    return /^\/at\/(.*)/.test(path || this.path);
  }

  isJobOfferPage(path) {
    return /^\/at\/(.*)\/(.*)/.test(path || this.path);
  }

  addToDOM() {
    this.addRatingToDOM();
    this.addDetailsToDOM();
    if (this.isJobOfferPage()) {
      this.addJobOfferRatingToDOM();
      this.addSalaryAverageToDOM();
    }
  }

  addRatingToDOM() {
    if (this.company.rating && this.company.url) {
      const rating = this.getRatingElement();
      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector(ratingElSelector.jobOfferPage);
        if (destinationEl) {
          destinationEl.prepend(rating);
          rating.style.marginRight = '1rem';
          this.ratingInjected = true;
        }
      } else if (this.isCompanyPage()) {
        const destinationEl = document.querySelector(ratingElSelector.companyPage);
        if (destinationEl) {
          rating.style.marginLeft = '16px';
          destinationEl.appendChild(rating);
          this.ratingInjected = true;
        }
      }
    }
  }

  addDetailsToDOM() {
    if (this.company.details) {
      const {
        container,
        link,
      } = this.getDetailsElement();

      link.style.display = 'inline-block';
      link.style.color = '#677077';
      link.style.fontSize = '.75rem';
      link.style.borderBottom = '.0625rem solid #677077';
      link.style.marginTop = '.55rem';

      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector(detailsElSelector.jobOfferPage);
        if (destinationEl) {
          container.style.marginBottom = '4rem';
          const referenceEl = document.querySelector('[class^="Sidebar-module_shareSection"]');
          destinationEl.insertBefore(container, referenceEl);
          this.detailsInjected = true;
        }
      } else if (this.isCompanyPage()) {
        const sidebar = document.querySelector(detailsElSelector.companyPage);
        if (sidebar) {
          container.style.marginBottom = '2rem';

          sidebar.prepend(container);
          this.detailsInjected = true;
        }
      }
    }
  }

  addSalaryAverageToDOM() {
    if (this.company.salary) {
      const {
        container,
        title,
        salaryLink,
        averageSalaryContainer,
        range,
      } = this.getSalaryElement();

      title.classList.add('ld-metatag-title');
      title.innerText = `${title.innerText}:`;
      title.style.marginRight = '8px';

      container.style.marginTop = '8px';
      container.style.marginLeft = '0';
      container.classList.add('ld-metatag');

      salaryLink.style.display = 'inline-block';
      salaryLink.style.lineHeight = '1em';
      salaryLink.style.fontSize = '1.1rem';
      salaryLink.style.marginTop = '2px';
      salaryLink.style.marginBottom = '2px';

      averageSalaryContainer.style.display = 'block';
      averageSalaryContainer.style.fontSize = '11px';
      averageSalaryContainer.style.lineHeight = '1em';


      const icon = document.createElement('div');
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="iconic-euro injected-svg iconic iconic-sm" width="128" height="128" viewBox="0 0 128 128" data-src="https://landing.jobs/assets/iconic/euro-664ecf0bbc7fff0bb9520631578a52b05dc891b3313202ae526d8e8d53c899cc.svg">
          <g class="iconic-metadata">
            <title>Euro</title>
          </g>
          <defs>
            <clipPath id="iconic-size-lg-euro-clip-0-335">
              <path d="M0 64l4-16h102l-13.334 40-92.666-8 4-16.001z"></path>
            </clipPath>
            <clipPath id="iconic-size-lg-euro-clip-1-335">
              <path d="M114 96h-24l32-96h-104v128h96z"></path>
            </clipPath>
            <clipPath id="iconic-size-md-euro-clip-0-335">
              <path d="M23.667 22l3.333-10h-26l-1 4 1.5.001-.5 1-1 4z"></path>
            </clipPath>
            <clipPath id="iconic-size-md-euro-clip-1-335">
              <path d="M29 24h-6l8-24h-26v32h24z"></path>
            </clipPath>
            <clipPath id="iconic-size-sm-euro-clip-0-335">
              <path d="M12.333 11l1.667-5h-13.5l-.5 2h.75l-.75 3z"></path>
            </clipPath>
            <clipPath id="iconic-size-sm-euro-clip-1-335">
              <path d="M15 12h-3l4-12h-13v16h12z"></path>
            </clipPath>
          </defs>
          <g class="iconic-euro-lg iconic-container iconic-lg" data-width="120" data-height="128" display="inline" transform="translate(4)">
            <path clip-path="url(#iconic-size-lg-euro-clip-0-335)" stroke="#000" stroke-width="8" class="iconic-euro-strike iconic-euro-strike-bottom iconic-property-accent iconic-property-stroke" d="M-6 76h104" fill="none"></path>
            <path clip-path="url(#iconic-size-lg-euro-clip-0-335)" stroke="#000" stroke-width="8" class="iconic-euro-strike iconic-euro-strike-top iconic-property-accent iconic-property-stroke" d="M106 60h-112" fill="none"></path>
            <path clip-path="url(#iconic-size-lg-euro-clip-1-335)" stroke="#000" stroke-width="12" d="M140 64c0 32.032-25.968 58-58 58s-58-25.968-58-58 25.968-58 58-58 58 23.206 58 58z" class="iconic-euro-e iconic-property-stroke" fill="none"></path>
          </g>
          <g class="iconic-euro-md iconic-container iconic-md" data-width="30" data-height="32" display="none" transform="scale(4) translate(1)">
            <path clip-path="url(#iconic-size-md-euro-clip-0-335)" stroke="#000" stroke-width="3" class="iconic-euro-strike iconic-euro-strike-bottom iconic-property-accent iconic-property-stroke" d="M-1 19.5h26" fill="none"></path>
            <path clip-path="url(#iconic-size-md-euro-clip-0-335)" stroke="#000" stroke-width="3" class="iconic-euro-strike iconic-euro-strike-top iconic-property-accent iconic-property-stroke" d="M27 14.5h-28" fill="none"></path>
            <circle clip-path="url(#iconic-size-md-euro-clip-1-335)" stroke="#000" stroke-width="4" cx="21" cy="16" r="14" class="iconic-euro-e iconic-property-stroke" fill="none"></circle>
          </g>
          <g class="iconic-euro-sm iconic-container iconic-sm" data-width="16" data-height="16" display="none" transform="scale(8)">
            <path clip-path="url(#iconic-size-sm-euro-clip-0-335)" stroke="#000" stroke-width="2" class="iconic-euro-strike iconic-euro-strike-bottom iconic-property-accent iconic-property-stroke" d="M0 10h13" fill="none"></path>
            <path clip-path="url(#iconic-size-sm-euro-clip-0-335)" stroke="#000" stroke-width="2" class="iconic-euro-strike iconic-euro-strike-top iconic-property-accent iconic-property-stroke" d="M14 7h-14" fill="none"></path>
            <circle clip-path="url(#iconic-size-sm-euro-clip-1-335)" stroke="#000" stroke-width="2" cx="11" cy="8" r="7" class="iconic-euro-e iconic-property-stroke" fill="none"></circle>
          </g>
        </svg>
      `;


      const content = document.createElement('div');
      content.appendChild(salaryLink);
      content.appendChild(averageSalaryContainer);

      container.prepend(icon);
      container.appendChild(content);
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.alignItems = 'baseline';

      if (range) {
        range.container.classList.add('ld-metatag');
        range.container.style.marginTop = '8px';
      }


      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector(salaryElSelector.jobOfferPage);
        if (destinationEl) {
          destinationEl.appendChild(container);
          if (range) {
            destinationEl.appendChild(range.container);
          }
          this.salaryInjected = true;
        }
      }
    }
  }

  handleLocationChange() {
    if (
      this.path !== window.location.pathname
      || this.search !== window.location.search
    ) {
      this.path = window.location.pathname;
      this.search = window.location.search;

      this.cleanup();
      this.bootObserver.disconnect();
      this.startBootObserver();
    }
  }

  init() {
    try {
      this.path = window.location.pathname;
      this.search = window.location.search;
      this.interval = setInterval(this.handleLocationChange.bind(this), 500);
      this.inject();
      this.startBootObserver();
    } catch (err) {
      console.log('err: ', err);
    }
  }
}

export default LandingJobsInjector;
