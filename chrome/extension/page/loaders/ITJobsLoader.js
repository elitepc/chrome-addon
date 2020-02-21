import Loader from './Loader';

export class ITJobsLoader extends Loader {
  constructor() {
    super();

    this.data = {
      name: null,
      slug: null,
    };
  }

  isCompanyPage() {
    return /^\/empresa\/(.*)/.test(this.path);
  }

  isJobOfferPage() {
    return /^\/oferta\/(.*)/.test(this.path);
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
      const pathParts = this.path.split('/');
      slug = pathParts[2];
    }
    if (this.isJobOfferPage()) {
      const el = document.querySelectorAll('.job-header h4 a');
      const path = el[0].pathname;
      const pathParts = path.split('/');
      slug = pathParts[2];
    }
    return slug;
  }

  loadData() {
    const name = this.getCompanyName();
    const slug = this.getCompanySlug();

    this.data.name = name;
    this.data.slug = slug;
  }
}

export default ITJobsLoader;
