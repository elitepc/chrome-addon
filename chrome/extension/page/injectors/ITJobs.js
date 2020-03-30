import { colors } from '../../../../config';
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
        }
      } else if (this.isCompanyPage()) {
        const destinationEl = document.querySelector('.company-header h1.title');
        if (destinationEl) {
          destinationEl.prepend(rating);
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
      container.style.backgroundColor = '#111821';
      container.style.borderColor = '#222c36';
      container.style.boxShadow = '0 3px 0 0 rgba(34,44,54,.8)';

      heading.classList.add('heading');
      heading.style.backgroundColor = 'transparent';

      text.classList.add('heading-title');
      text.classList.add('sidebar-text');
      text.classList.add('pull-left');
      text.style.backgroundColor = '#13231b';
      text.style.color = colors.primary;
      text.style.border = `1px solid ${colors.primary}`;

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
      } = this.getSalaryElement();

      container.classList.add('info');

      title.classList.add('title');

      salary.classList.add('field');

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

      const destinationEl = document.querySelector('.job-header .item-details > ul');
      destinationEl.appendChild(listItem);
    }
  }

  init() {
    this.inject();
  }
}

export default ITJobsInjector;
