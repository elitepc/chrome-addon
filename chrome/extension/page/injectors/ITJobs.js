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
        if (destinationEl) {
          destinationEl.prepend(rating);
          this.ratingInjected = true;
        }
      } else if (this.isCompanyPage()) {
        const destinationEl = document.querySelector('.company-header h1.title');
        if (destinationEl) {
          destinationEl.prepend(rating);
          this.ratingInjected = true;
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
        link,
      } = this.getDetailsElement();

      container.classList.add('block');
      container.classList.add('sidebar');

      heading.classList.add('heading');

      text.classList.add('heading-title');
      text.classList.add('sidebar-text');
      text.classList.add('pull-left');

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
        if (destinationEl) {
          destinationEl.prepend(container);
          this.detailsInjected = true;
        }
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
        sidebar.prepend(wrapper);

        const mainRow = document.querySelector('.main-container > .row');
        if (mainRow) {
          mainRow.classList.remove('col-md-12');
          mainContainer.classList.add('col-md-9');
          mainRow.appendChild(sidebar);
          this.detailsInjected = true;
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
        range,
      } = this.getSalaryElement();

      container.classList.add('info');

      title.classList.add('title');

      salary.classList.add('field');

      averageSalaryContainer.style.fontSize = '13px';
      averageSalaryContainer.classList.add('field');

      const icon = document.createElement('i');
      icon.classList.add('fa');
      icon.classList.add('fa-money');

      const iconWrapper = document.createElement('div');
      iconWrapper.classList.add('icon');
      iconWrapper.appendChild(icon);

      const listItem = document.createElement('li');
      listItem.appendChild(iconWrapper);
      listItem.appendChild(container);

      const rangeListItem = document.createElement('li');
      rangeListItem.appendChild(range.container);

      const destinationEl = document.querySelector('.job-header .item-details > ul');
      destinationEl.appendChild(listItem);
      destinationEl.appendChild(rangeListItem);
      this.salaryInjected = true;
    }
  }

  init() {
    this.cleanup();
    this.inject();
  }
}

export default ITJobsInjector;
