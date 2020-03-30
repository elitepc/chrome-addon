import { colors } from '../../../../config';
import { Base } from './Base';

export class LinkedInInjector extends Base {
  constructor(loader) {
    super(loader);

    this.bootObserver = new MutationObserver(() => {
      if (document.body.classList.contains('boot-complete')) {
        this.cleanup();
        this.inject();
      }
    });

    this.searchObserver = new MutationObserver(() => {
      const el = document.querySelector('.jobs-details-top-card__company-url');
      if (!this.injected && el && this.isCompanyPage(el.pathname)) {
        this.cleanup();
        this.inject();
      }
    });
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
        }
      } else if (this.isSearchPage()) {
        const destinationEl = document.querySelector('.jobs-details-top-card__company-info');
        if (destinationEl) {
          destinationEl.prepend(rating);
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
      container.style.backgroundColor = '#111821';
      container.style.borderColor = '#222c36';

      heading.classList.add('ph4');
      heading.classList.add('pt4');
      heading.classList.add('pb2');
      heading.classList.add('t-18');

      text.firstChild.style.display = 'block';

      content.classList.add('pt3');
      content.classList.add('pb1');
      content.classList.add('ph4');
      content.style.backgroundColor = 'transparent';

      list.classList.add('org-highlight-reel-module__card');
      list.classList.add('artdeco-card');
      list.classList.add('p3');
      list.style.backgroundColor = 'transparent';
      list.style.boxShadow = '0 0 0 1px rgba(255,255,255,.15)';

      for (const child of list.children) {
        const bar = child.children[0];
        if (bar && !bar.children[0]) {
          child.style.borderColor = 'rgba(255,255,255,.15)';
        }
      }

      link.classList.add('t-14');
      link.classList.add('t-black--light');
      link.classList.add('t-bold');
      link.classList.add('artdeco-button');
      link.classList.add('artdeco-button--1');
      link.classList.add('artdeco-button--tertiary');
      link.classList.add('mt3');
      link.style.borderTop = '1px solid rgba(255,255,255,.15)';
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
        }
      } else if (this.isCompanyPage()) {
        const sidebar = document.querySelector('.org-grid__right-rail');
        if (sidebar) {
          sidebar.prepend(container);
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

      container.style.lineHeight = '1em';

      salary.style.display = 'block';
      salary.style.lineHeight = '1em';

      averageSalaryContainer.style.lineHeight = '1em';

      const item = document.createElement('div');
      item.classList.add('job-flavors__flavor');
      item.appendChild(container);

      if (this.isJobOfferPage()) {
        container.classList.add('mt1');

        const destinationEl = document.querySelector('.jobs-top-card__flavors');
        if (destinationEl) {
          destinationEl.appendChild(item);
        }
      } else if (this.isSearchPage()) {
        container.classList.add('mr3');

        const destinationEl = document.querySelector('.jobs-details-top-card__actions');
        if (destinationEl) {
          destinationEl.prepend(item);
        }
      }
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
      attributeFilter: ['class']
    });
  }

  handleLocationChange() {
    if (
      this.path !== window.location.pathname
      || this.search !== window.location.search
    ) {
      this.searchObserver.disconnect();
      this.injected = false;
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
        this.path = window.location.pathname;
        this.search = window.location.search;
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
