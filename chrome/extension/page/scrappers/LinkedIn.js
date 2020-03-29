import { Base } from './Base';

export class LinkedInLoader extends Base {
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
      const el = document.querySelector('.jobs-top-card__company-url');
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
      const el = document.getElementsByClassName('jobs-top-card__company-url');
      if (el[0]) {
        const path = el[0].pathname;
        const [,, part] = path.split('/');
        slug = part;
      }
    }
    if (this.isSearchPage()) {
      const el = document.getElementsByClassName('jobs-details-top-card__company-url');
      if (el[0]) {
        const path = el[0].pathname;
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
