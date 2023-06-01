export default /*css*/ `
:host {
  outline: none;
}

:host > ul,
:host > * > ul {
  padding-left: 0;
}

.x-highlighted {
  background: #ccc;
}

ul {
  list-style: none;
}

li {
  cursor: pointer;
  margin: 0;
  line-height: 28px;

  &.disabled {
    opacity: .7;
    cursor: initial;
  }

  &:has(ul) {
    &:not([aria-expanded]){
      &::before {
        content: '⊞';
        display: inline-block;
        width: 1em;;
      }
    }

    &[aria-expanded] {
      background: #f9f9f9;

      &::before {
        content: '⊟';
        display: inline-block;
        width: 1em;;
      }

      &.x-highlighted {
        background: #ccc;
      }

      > ul,
      > * > ul {
        background: #FFF;
        padding-left: 1em;;
      }
    }
  }

  > ul {
    border-left: 1px dashed black;
  }

  &:not([aria-expanded]) > ul,
  &:not([aria-expanded]) > * > ul {
    display: none;
  }
}`;
