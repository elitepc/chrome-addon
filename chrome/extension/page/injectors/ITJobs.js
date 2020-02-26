import { Base } from './Base';

export class ITJobsInjector extends Base {
  isCompanyPage() {
    return /^\/empresa\/(.*)/.test(this.path);
  }

  isJobOfferPage() {
    return /^\/oferta\/(.*)/.test(this.path);
  }

  addRatingToDOM() {
    if (this.company.rating && this.company.url) {
      const rating = this.getRatingElement();
      rating.style.marginRight = '8px';
      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector('.job-header h4.thin.grey');
        destinationEl.prepend(rating);
      } else if (this.isCompanyPage()) {
        const destinationEl = document.querySelector('.company-header h1.title');
        destinationEl.prepend(rating);
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
        link,
      } = this.getDetailsElement();

      container.classList.add('block');
      container.classList.add('sidebar');
      container.style.backgroundColor = '#111821';
      container.style.color = '#878b8f';
      container.style.borderColor = '#222c36';
      container.style.boxShadow = '0 3px 0 0 rgba(34,44,54,.8)';

      heading.classList.add('heading');
      heading.style.backgroundColor = 'transparent';

      text.classList.add('heading-title');
      text.classList.add('sidebar-text');
      text.classList.add('pull-left');
      text.style.backgroundColor = '#13231b';
      text.style.color = '#59b287';
      text.style.border = '1px solid #59b287';

      content.classList.add('sidebar-content');

      link.classList.add('related-more');
      link.classList.add('pull-right');
      const arrow = document.createElement('span');
      arrow.classList.add('glyphicon');
      arrow.classList.add('glyphicon-chevron-right');
      link.appendChild(arrow);

      const clearfix = document.createElement('div');
      clearfix.classList.add('clearfix');
      content.appendChild(clearfix);

      if (this.isJobOfferPage()) {
        const destinationEl = document.querySelector('.main-container .col-md-3.altered .col-xs-12.col-sm-12.col-md-12');
        destinationEl.prepend(container);
      } else if (this.isCompanyPage()) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '20px';
        wrapper.appendChild(container);

        const mainContainer = document.querySelector('.main-container .col-md-12');
        mainContainer.classList.remove('col-md-12');
        mainContainer.classList.add('col-md-9');
        mainContainer.classList.add('altered');

        const sidebar = document.createElement('div');
        sidebar.classList.add('col-md-3');
        sidebar.classList.add('altered');

        const mainRow = document.querySelector('.main-container > .row');
        mainRow.classList.remove('col-md-12');
        mainContainer.classList.add('col-md-9');
        mainRow.appendChild(sidebar);

        sidebar.prepend(wrapper);
      }
    }
  }
}

export default ITJobsInjector;
