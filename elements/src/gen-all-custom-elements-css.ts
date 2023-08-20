import comboboxCss from './combobox/combobox.css';
import fileSelectCss from './file-select/file-select.css';
import formStepperCss from './form-stepper/form-stepper.css';
import inputMaskCss from './input-mask/input-mask.css';
import listSelectCss from './list-select/list-select.css';
import sidebarCss from './sidebar/sidebar.css'; // side-bar
import paginationCss from './x-pagination/pagination.css'; // x-pagination/

[
  ['combo-box', comboboxCss],
  ['file-select', fileSelectCss],
  ['form-stepper', formStepperCss],
  ['input-mask', inputMaskCss],
  ['list-select', listSelectCss],
  ['side-bar', sidebarCss],
  ['x-pagination', paginationCss],
].forEach( ([tagName, css]) => {
  tagName = tagName.toLowerCase();
  console.info(css);
});