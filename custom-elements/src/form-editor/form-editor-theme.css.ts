// extension es6-string-css for vscode
export default /* css */ `
/* Primary color for the background */
form-editor .gjs-one-bg {
  background-color: #EEE;
}

/* Secondary color for the text color */
form-editor .gjs-two-color {
  color: #111;
}

/* Tertiary color for the background */
form-editor .gjs-three-bg {
  background-color: #666;
  color: white;
}

/* Quaternary color for the text color */
form-editor :is(.gjs-four-color, .gjs-four-color-h:hover) {
  color: #ec5896;
}

form-editor :is(.gjs-sm-field.gjs-sm-composite, .gjs-sm-composite.gjs-clm-select, .gjs-sm-composite.gjs-clm-field) {
  background-color: initial;
}

form-editor .gjs-field {
  border: 1px solid #999;
  background-color: #DDD;

}

form-editor .gjs-field :is(input, select, textarea) {
  background-color: #DDD;
  border: 1px solid #DDD;
  color: #333;
}

form-editor .gjs-radio-item input:checked+.gjs-radio-item-label {
  background-color: #CCC;
  border: 1px inset #DDD;
}

form-editor .gjs-clm-tags #gjs-clm-new {
  color: initial;
}

form-editor :is(.gjs-category-title, .gjs-layer-title, .gjs-block-category .gjs-title, .gjs-sm-sector-title) {
  font-weight: normal;
}

form-editor .gjs-trt-trait {
  font-weight: normal;
}

form-editor .gjs-field-checkbox input:checked+.gjs-chk-icon {
  border-color: initial;
}

form-editor .gjs-sm-sector {
  font-weight: normal;
}

form-editor .gjs-field-arrow-u, .gjs-field-arrow-d {
  border-top: 4px solid #333;
}

form-editor .gjs-field-arrow-u {
  border-bottom: 4px solid #333;
  border-top: none;
  top: 4px;
}
`;
