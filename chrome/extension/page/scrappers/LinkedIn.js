import { Base } from './Base';

export class LinkedInLoader extends Base {
  isCompanyPage() {
    return /^\/company\/(.*)/.test(this.path);
  }

  isJobOfferPage() {
    return /^\/jobs\/view\/(.*)/.test(this.path);
  }

  getCompanyName() {
    let name;
    if (this.isCompanyPage()) {
      name = this.getMeta('title');
    }
    if (this.isJobOfferPage()) {
      const el = document.getElementsByClassName('jobs-top-card__company-url');
      name = el[0].text.trim();
    }
    return name;
  }

  getCompanySlug() {
    let slug;
    if (this.isCompanyPage()) {
      const [,, part] = this.path.split('/');
      slug = part;
    }
    if (this.isJobOfferPage()) {
      const el = document.getElementsByClassName('jobs-top-card__company-url');
      const path = el[0].pathname;
      const [,, part] = path.split('/');
      slug = part;
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
