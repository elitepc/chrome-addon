import { getCompanyInfo } from '../data/company';

export class Base {
  constructor(loader) {
    this.path = window.location.pathname;

    this.company = loader.loadData();
  }

  getRatingElement() {
    const rating = document.createElement('div');
    rating.style.backgroundColor = 'red';
    rating.style.textAlign = 'center';
    rating.innerText = this.company.rating;

    const link = document.createElement('a');
    link.href = this.company.url;
    link.target = '_blank';
    link.appendChild(rating);

    const item = document.createElement('li');
    item.appendChild(link);

    return item;
  }

  getDetailsElement() {
    // Create Heading
    const text = document.createElement('div');
    text.classList.add('sidebar-text');
    text.classList.add('pull-left');
    text.style.backgroundColor = '#13231b';
    text.style.color = '#59b287';
    text.style.border = '1px solid #59b287';
    text.innerText = 'Teamlyzer';
    const headingTitle = document.createElement('div');
    headingTitle.classList.add('heading-title');
    headingTitle.appendChild(text);
    const heading = document.createElement('div');
    heading.classList.add('heading');
    heading.style.backgroundColor = 'transparent';
    heading.appendChild(headingTitle);

    // Create Content
    const content = document.createElement('div');
    content.classList.add('sidebar-content');
    content.classList.add('mb');

    // Add Details

    content.innerText = 'Place to add progress bars';

    // Add Details break
    const breakEl = document.createElement('hr');
    // content.appendChild(breakEl);

    // Create Block
    const block = document.createElement('div');
    block.classList.add('block');
    block.classList.add('sidebar');
    block.style.backgroundColor = '#111821';
    block.style.color = '#878b8f';
    block.style.borderColor = '#222c36';
    block.style.boxShadow = '0 3px 0 0 rgba(34,44,54,.8)';

    block.appendChild(heading);
    block.appendChild(content);

    return block;
  }

  isCompanyPage() {
    console.warn('Method isCompanyPage not implemented');
  }

  isJobOfferPage() {
    console.warn('Method isJobOfferPage not implemented');
  }

  addRatingToDOM() {
    console.warn('Method addRatingToDOM not implemented');
  }

  addDetailsToDOM() {
    console.warn('Method addDetailsToDOM not implemented');
  }

  addJobOfferRatingToDOM() {
    console.warn('Method addJobOfferRatingToDOM not implemented');
  }

  addToDOM() {
    this.addRatingToDOM();
    this.addDetailsToDOM();
    if (this.isJobOfferPage()) {
      this.addJobOfferRatingToDOM();
    }
  }

  async init() {
    const result = await getCompanyInfo({
      slug: this.company.slug,
    });

    this.company = {
      ...this.company,
      ...result,
    };

    this.addToDOM();
  }
}

export default Base;
