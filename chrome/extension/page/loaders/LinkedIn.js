import { Base } from './Base';


export class LinkedInLoader extends Base {
  constructor() {
    super();
    this.source = 'linkedin';
  }

  isCompanyPage() {
    return /^\/company\/(.*)/.test(window.location.pathname);
  }

  isJobOfferPage() {
    return /^\/jobs\/view\/(.*)/.test(window.location.pathname);
  }

  isSearchPage() {
    return /^\/jobs\/search\/(.*)/.test(window.location.pathname);
  }

  getCompanyName() {
    let name;
    if (this.isCompanyPage()) {
      name = this.getMeta('title');
    }
    if (this.isJobOfferPage()) {
      const el = document.querySelector('.jobs-unified-top-card__subtitle-primary-grouping a');
      name = el.text.trim();
    }
    if (this.isSearchPage()) {
      const el = document.querySelector('.jobs-details-top-card__company-url');
      name = el.text.trim();
    }
    return name;
  }

  getCompanySlug() {
    let slug;
    if (this.isCompanyPage()) {
      const [,, part] = window.location.pathname.split('/');
      slug = part;
    }
    if (this.isJobOfferPage()) {
      const el = document.querySelector('.jobs-unified-top-card__subtitle-primary-grouping a');
      if (el) {
        const path = el.pathname;
        const [,, part] = path.split('/');
        slug = part;
      }
    }
    if (this.isSearchPage()) {
      const el = document.querySelector('.jobs-details-top-card__company-url');
      if (el) {
        const path = el.pathname;
        const [,, part] = path.split('/');
        slug = part;
      }
    }
    return slug;
  }

  loadData() {
    const name = this.getCompanyName();
    const slug = this.getCompanySlug();

    return {
      name,
      slug,
    };
  }
}

export default LinkedInLoader;
