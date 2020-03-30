import { getCompanyInfo } from '../data/company';

export class Base {
  constructor() {
    this.path = window.location.pathname;
    this.source = null;
  }

  getMeta(name) {
    const metas = document.getElementsByTagName('meta');

    for (const meta of metas) {
      if (meta.getAttribute('name') === name) {
        return meta.getAttribute('content');
      }
    }
  }

  getCompanyData(company) {
    return getCompanyInfo({
      slug: company.slug,
      source: this.source,
    });
  }
}

export default Base;
