import { Base } from './Base';

export class ITJobsInjector extends Base {
  constructor(loader) {
    super(loader);
  }

  isCompanyPage() {
    return /^\/empresa\/(.*)/.test(this.path);
  }

  isJobOfferPage() {
    return /^\/oferta\/(.*)/.test(this.path);
  }

  addRatingToDOM() {
    if (this.company.rating && this.company.url) {
      const rating = this.getRatingElement();
      const destinationEl = document.querySelector('.item-details > ul');
      destinationEl.appendChild(rating);
    }
  }

  addDetailsToDOM() {
    if (this.company.details) {
      const details = this.getDetailsElement();
      const destinationEl = document.querySelector('.main-container .col-md-3.altered .col-xs-12.col-sm-12.col-md-12');
      destinationEl.prepend(details);
    }
  }
}

export default ITJobsInjector;
