export class Base {
  constructor() {
    this.path = window.location.pathname;
  }

  getMeta(name) {
    const metas = document.getElementsByTagName('meta');

    for (const meta of metas) {
      if (meta.getAttribute('name') === name) {
        return meta.getAttribute('content');
      }
    }
  }
}

export default Base;
