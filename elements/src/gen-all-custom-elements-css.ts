import postcss from 'postcss';
import prefixer from 'postcss-prefix-selector';
import comboboxCss from './combobox/combobox.css';
import fileSelectCss from './file-select/file-select.css';
import formStepperCss from './form-stepper/form-stepper.css';
import inputMaskCss from './input-mask/input-mask.css';
import listSelectCss from './list-select/list-select.css';
import sidebarCss from './sidebar/sidebar.css'; // side-bar
import paginationCss from './x-pagination/pagination.css'; // x-pagination/

[
  ['combop-box', comboboxCss],
  ['file-select', fileSelectCss],
  ['form-stepper', formStepperCss],
  ['input-mask', inputMaskCss],
  ['list-select', listSelectCss],
  ['side-bar', sidebarCss],
  ['x-pagination', paginationCss],
].forEach( ([tagName, css]) => {
  tagName = tagName.toLowerCase();
  const plugin = prefixer({
    prefix: tagName,
    transform(prefix, selector, prefixedSelector, filePath, rule) { 
      return selector.match(/^:host/) ? selector.replace(/:host/, prefix):
        selector.match(new RegExp(`\\s*${tagName}`)) ? selector : `${prefix} ${selector}`;
    },
  });
  try {
    const scopedCss = postcss().use(plugin).process(css, {map: false}).css;
    console.info(scopedCss.toString());
  } catch(e) {
    console.info({tagName, css});
    throw e;
  }
});