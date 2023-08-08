export default /*css*/ `
  :host {
    display: block;
  }
  .navigation .prev {
    display: inline-block;
  }

  .page {
    border: none;
    background: #FFF;
    min-width: 28px;
    min-height: 28px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: inherit;
  }

  .page:disabled { color: #CCC; }
  .page.prev::before { content : '◀'; }
  .page.next::before { content : '▶'; }
  .page.first::before { content : '◀◀'; }
  .page.last::before { content : '▶▶'; }

  .pages {
    display: inline-block;
  }

  .pages > .page.selected {
    color: #FFF;
    background-color: #0B51C1;
    border-radius: 4px;
    box-shadow: 0 2px 5px 0 #DDD, 0 2px 10px 0 #CCC;
    transition: all .2s linear;
  }`;