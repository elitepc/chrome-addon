import debounce from 'lodash/debounce';
import { colors } from '../../../../config';
import { Base } from './Base';

export class LinkedInInjector extends Base {
  constructor(loader) {
    super(loader);

    const debouncedObserveBoot = debounce(this.observeBoot.bind(this), 100);
    this.bootObserver = new MutationObserver(debouncedObserveBoot);

    const debouncedObserveSearch = debounce(this.observeSearch.bind(this), 1000);
    this.searchObserver = new MutationObserver(debouncedObserveSearch);

    const debouncedObserveSalaryContainer = debounce(this.observeSalaryContainer.bind(this), 1000);
    this.salaryContainerObserver = new MutationObserver(debouncedObserveSalaryContainer);
  }

  observeBoot() {
    if (document.body.classList.contains('boot-complete')) {
      this.cleanup();
      this.inject();
    }
  }

  observeSearch() {
    const el = document.querySelector('.jobs-details-top-card__company-url');
    if (!this.injecting && el && this.isCompanyPage(el.pathname)) {
      if (!this.salaryInjected || !this.ratingInjected) {
        this.cleanup();
        this.inject();
      }
    }
  }

  observeSalaryContainer() {
    const el = document.querySelector('.jobs-top-card__flavors');
    if (!this.salaryInjected && el) {
      this.cleanup();
      this.inject();
    }
  }

  startSearchPageObserver() {
    const el = document.querySelector('.jobs-search-two-pane__details');
    this.searchObserver.observe(el, {
      childList: true,
      subtree: true,
    });
  }

  startBootObserver() {
    this.bootObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  startSalaryContainerObserver() {
    let el = null;
    if (this.isJobOfferPage()) {
      el = document.querySelector('.justify-space-between.display-flex.align-items-stretch.mb4 .mt6.ml5.flex-grow-1');
    }
    if (el) {
      this.salaryContainerObserver.observe(el, {
        childList: true,
        subtree: true,
      });
    }
  }

  isCompanyPage(path) {
    return /^\/company\/(.*)/.test(path || this.path);
  }

  isJobOfferPage(path) {
    return /^\/jobs\/view\/(.*)/.test(path || this.path);
  }

  isSearchPage(path) {
    return /^\/jobs\/search\/(.*)/.test(path || this.path);
  }

  addToDOM() {
    this.addRatingToDOM();
    if (this.isJobOfferPage()) {
      this.addJobOfferRatingToDOM();
    }
    if (this.isJobOfferPage() || this.isCompanyPage()) {
      this.addDetailsToDOM();
    }
    if (this.isJobOfferPage() || this.isSearchPage()) {
      this.addSalaryAverageToDOM();
    }
  }

  addRatingToDOM() {
    if (this.company.rating && this.company.url) {
      const rating = this.getRatingElement();
      rating.style.marginRight = '8px';
      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector('.jobs-top-card');
        if (destinationEl) {
          rating.style.position = 'absolute';
          rating.style.top = '86px';
          rating.style.left = '112px';
          destinationEl.prepend(rating);
          this.ratingInjected = true;
        }
      } else if (this.isCompanyPage()) {
        const destinationEl = document.querySelector('.org-top-card-primary-content__content');
        if (destinationEl) {
          destinationEl.style.position = 'relative';
          rating.style.position = 'absolute';
          rating.style.top = '0px';
          rating.style.left = '128px';
          rating.style.transform = 'translateY(-100%)';
          destinationEl.prepend(rating);
          this.ratingInjected = true;
        }
      } else if (this.isSearchPage()) {
        const destinationEl = document.querySelector('.jobs-details-top-card__company-info');
        if (destinationEl) {
          destinationEl.prepend(rating);
          this.ratingInjected = true;
        }
      }
    }
  }

  addDetailsToDOM() {
    if (this.company.details) {
      const {
        container,
        heading,
        text,
        content,
        list,
        link,
      } = this.getDetailsElement();

      container.classList.add('mb3');
      container.classList.add('container-with-shadow');
      container.classList.add('p0');

      heading.classList.add('ph4');
      heading.classList.add('pt4');
      heading.classList.add('pb2');
      heading.classList.add('t-18');

      text.firstChild.style.display = 'block';

      content.classList.add('pt3');
      content.classList.add('pb1');
      content.classList.add('ph4');

      list.classList.add('org-highlight-reel-module__card');
      list.classList.add('artdeco-card');
      list.classList.add('p3');
      list.style.boxShadow = '0 0 0 1px rgba(0,0,0,.15)';

      link.classList.add('t-14');
      link.classList.add('t-black--light');
      link.classList.add('t-bold');
      link.classList.add('artdeco-button');
      link.classList.add('artdeco-button--1');
      link.classList.add('artdeco-button--tertiary');
      link.classList.add('mt3');
      link.style.borderTop = '1px solid rgba(0,0,0,.15)';
      link.style.display = 'flex';
      link.style.justifyContent = 'flex-center';
      link.style.width = '100%';
      link.style.padding = '16px';
      link.style.color = colors.primary;

      container.appendChild(link);

      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector('.right-rail');
        if (destinationEl) {
          destinationEl.prepend(container);
          this.detailsInjected = true;
        }
      } else if (this.isCompanyPage()) {
        const sidebar = document.querySelector('.org-grid__right-rail');
        if (sidebar) {
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
        salary,
        averageSalaryContainer,
      } = this.getSalaryElement();

      title.classList.add('job-flavors__label');
      title.classList.add('mb1');
      title.style.display = 'block';

      container.classList.add('job-flavors__flavor');
      container.style.lineHeight = '1em';

      salary.style.display = 'block';
      salary.style.lineHeight = '1em';

      averageSalaryContainer.style.fontSize = '11px';
      averageSalaryContainer.style.lineHeight = '1em';

      if (this.isJobOfferPage()) {
        container.classList.add('mt3');
        container.style.display = 'block';

        const destinationEl = document.querySelector('.justify-space-between.display-flex.align-items-stretch.mb4 .mt6.ml5.flex-grow-1');
        if (destinationEl) {
          destinationEl.appendChild(container);
          this.salaryInjected = true;
          this.salaryContainerObserver.disconnect();
        } else {
          this.startSalaryContainerObserver();
        }
      } else if (this.isSearchPage()) {
        container.classList.add('mr3');

        container.classList.add('mb4');
        container.style.display = 'block';
        container.style.width = '100%';

        const destinationEl = document.querySelector('.jobs-details-top-card__actions');
        if (destinationEl) {
          destinationEl.prepend(container);
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
      this.searchObserver.disconnect();
      this.path = window.location.pathname;
      this.search = window.location.search;
      this.cleanup();

      if (this.isSearchPage()) {
        this.startSearchPageObserver();
      } else {
        this.inject();
      }
    }
  }

  init() {
    try {
      this.path = window.location.pathname;
      this.search = window.location.search;
      this.interval = setInterval(this.handleLocationChange.bind(this), 500);

      if (this.isSearchPage()) {
        this.startSearchPageObserver();
      }

      if (document.body.classList.contains('boot-complete')) {
        if (this.isSearchPage()) {
          this.startSearchPageObserver();
        } else {
          this.cleanup();
          this.inject();
        }
      } else {
        this.startBootObserver();
      }
    } catch (err) {
      console.log('err: ', err);
    }
  }
}

export default LinkedInInjector;
