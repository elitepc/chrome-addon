import { Base } from './Base';

export class LandingJobsLoader extends Base {
  constructor() {
    super();
    this.source = 'landingjobs';
  }

  isCompanyPage() {
    const path = window.location.pathname;
    const parts = path.split('/');
    if (
      parts[1] === 'at'
      && !parts[3]
    ) {
      return true;
    }
    return false;
  }

  isJobOfferPage() {
    const path = window.location.pathname;
    const parts = path.split('/');
    if (
      parts[1] === 'at'
      && !!parts[3]
    ) {
      return true;
    }
    return false;
  }

  getCompanyName() {
    let name;
    if (this.isCompanyPage()) {
      const title = document.getElementsByTagName('h1')[0];
      if (title) {
        name = title.innerText;
      }
    }
    if (this.isJobOfferPage()) {
      const el = document.querySelectorAll('.ld-company-name .ld-light-link');
      if (el[0]) {
        name = el[0].text;
      }
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
      const [,, part] = window.location.pathname.split('/');
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

export default LandingJobsLoader;
