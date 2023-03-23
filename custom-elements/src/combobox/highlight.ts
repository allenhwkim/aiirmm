const CLASS_HIGHLIGHTED = `x-highlighted`;
const CLASS_SELECTED = `x-selected`;
const CLASS_HIDDEN = `hidden`;
const CLASS_DISABLED = `disabled`;

/**
 * Find an element that has attribute 'value' is the same as the given value from the list element.
 */
export function highlightValue(listEl: HTMLUListElement, value: any) {
  const highlightedEl = listEl.querySelector(`.${CLASS_HIGHLIGHTED}:not(.${CLASS_HIDDEN})`)

  const nextHighlight = [...listEl.children].find((liEl: any) => {
    return (liEl.dataset.value === value) || (liEl.innerText === value);
  })

  if (nextHighlight) {
    highlightedEl?.classList.remove(CLASS_HIGHLIGHTED, CLASS_SELECTED);
    nextHighlight.classList.add(CLASS_HIGHLIGHTED, CLASS_SELECTED);
    scrollIfNeeded(listEl, nextHighlight);
  }
}

/**
 * Hide all child elements of list element that does not have search string
 * by removing highlighted class and adding hidden class.
 * It also add highted class to the first searched element.
 */
export function highlightSearch(listEl: HTMLUListElement, search: string) {
  const matches = [...listEl.children].filter((el: any) => {
    const re = new RegExp(search.replace(/\\/g, '\\\\'), 'i');
    const match = el.innerText.match(re);
    el.classList.remove(CLASS_HIGHLIGHTED);
    el.removeAttribute(CLASS_HIDDEN);
    if (!match) {
      el.setAttribute(CLASS_HIDDEN, '');
    }
    return match;
  });
  matches[0]?.classList.add(CLASS_HIGHLIGHTED);
}

/**
 * Find the current highlighted class, and move highting to the next element
 */
export function highlightNext(listEl: HTMLUListElement, inc=1) {
  const highlightedEl = listEl.querySelector(`.${CLASS_HIGHLIGHTED}:not(.${CLASS_HIDDEN})`);
  const notDisaledOrHidden = [...listEl.children].filter(liEl => {
    const notDisabled = !liEl.classList.contains(CLASS_DISABLED);
    const notHidden = !liEl.classList.contains(CLASS_HIDDEN);
    return notDisabled && notHidden;
  });

  const curIndex = notDisaledOrHidden
    .findIndex(el => el.isEqualNode(highlightedEl)) || 0;
  const total = notDisaledOrHidden.length;

  const nextHighlight = notDisaledOrHidden[(curIndex + total + inc) % total];

  highlightedEl?.classList.remove(CLASS_HIGHLIGHTED, CLASS_SELECTED);
  nextHighlight.classList.add(CLASS_HIGHLIGHTED);
  scrollIfNeeded(listEl, nextHighlight);
}

/**
 * scroll to the given element within a container.
 */
export function scrollIfNeeded(container: any, element: any) {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}