import { customElement } from '../../lib';
import css from './sidebar.css';

export const SideBar = customElement({
  css,
  shadow: false,
  constructorCallback() {
    this.documentClickListener = this.docClickHandler.bind(this);
  },
  connectedCallback() {
    this.classList.add('sidebar')
    this.addEventListener('click', function(this:any, event: any) {
      if (event.target.closest('.close-button')) {
        this.toggle();
      } else {
        this.dispatchEvent(new CustomEvent('sidebar', {bubbles: true, detail: event.target}));
      }
    });
    document.querySelector('[data-x-target="sidebar"]')?.addEventListener('click', () => this.toggle());
    document.addEventListener('click', this.documentClickListener);
  },
  disconnectedCallback() {
    document.removeEventListener('click', this.documentClickListener);
  },
  toggle() {
    this.classList.toggle('visible');
    const detail = this.classList.contains('visible') ? 'sidebar-open' : 'sidebar-close';
    this.dispatchEvent(new CustomEvent('sidebar', {bubbles: true,  detail}));
  },
  docClickHandler(event) {
    const clickInSidebar = event.target.closest('.sidebar, [data-x-target="sidebar"]');
    if (!clickInSidebar && this.classList.contains('visible')) {
      this.toggle();
      event.preventDefault();
      event.stopPropagation();
    }
  }

});