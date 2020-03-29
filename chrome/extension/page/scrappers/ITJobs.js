import { Base } from './Base';

export class ITJobsLoader extends Base {
  isCompanyPage() {
    return /^\/empresa\/(.*)/.test(window.location.pathname);
  }

  isJobOfferPage() {
    return /^\/oferta\/(.*)/.test(window.location.pathname);
  }

  getCompanyName() {
    let name;
    if (this.isCompanyPage()) {
      name = this.getMeta('title');
    }
    if (this.isJobOfferPage()) {
      const el = document.querySelectorAll('.job-header h4 a');
      name = el[0].text;
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
      const el = document.querySelectorAll('.job-header h4 a');
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

export default ITJobsLoader;
