declare global {
  namespace JSX {
    interface IntrinsicElements {
      'combo-box': any;
      'form-stepper': any;
      'form-designer': any;
      'form-diagram': any;
      'input-mask': any;
      'resize-divs': any;
      'resize-handle': any;
      'json-viewer': any;
      'bar-code': any;
      'file-select': any;
      'list-select': any;
      'ol-map': any;
      'x-pagination': any;
      'x-if': any;
      'x-bind': any;
      'qr-code': any;
      'syntax-highlight': any;
      'side-bar': any;
      'monaco-editor': any;
    }
  }
}

import { BarCode } from './barcode/barcode';
import { ComboBox } from './combobox/combobox';
import { FileSelect } from './file-select/file-select';
import { FormDesigner } from './form-designer/form-designer';
import { FormDiagram } from './form-diagram/form-diagram';
import { FormStepper } from './form-stepper/form-stepper';
import { FormflowChart } from "./react-components/FormflowChart/FormflowChart"
import { InputMask } from './input-mask/input-mask';
import { JsonViewer } from './json-viewer/json-viewer';
import { ListSelect } from './list-select/list-select';
import { OlMap } from './ol-map/ol-map';
import { Pagination } from './x-pagination/pagination';
import { QrCode } from './qr-code/qr-code';
import { ResizeDivs } from './resize-divs/resize-divs';
import { ResizeHandle } from './resize-handle/resize-handle';
import { SideBar } from './sidebar/sidebar';
import { SyntaxHighlight } from './syntax-highlight/syntax-highlight';
import { MonacoEditor } from './monaco-editor/monaco-editor';
import { XBind, XChecks, XIf } from './x-if/index';

export {
 BarCode,
 ComboBox,
 FileSelect,
 FormDesigner,
 FormDiagram,
 FormStepper,
 FormflowChart,
 InputMask,
 JsonViewer,
 ListSelect,
 OlMap, 
 Pagination, 
 QrCode,
 ResizeDivs,
 ResizeHandle,
 SideBar,
 SyntaxHighlight,
 MonacoEditor,
 XBind, XChecks, XIf,
};

export function defineAll() {
  customElements.define('bar-code', BarCode);
  customElements.define('combo-box', ComboBox);
  customElements.define('file-select', FileSelect);
  customElements.define('form-designer', FormDesigner);
  customElements.define('form-diagram', FormDiagram);
  customElements.define('form-stepper', FormStepper);
  customElements.define('input-mask', InputMask);
  customElements.define('json-viewer', JsonViewer);
  customElements.define('list-select', ListSelect);
  customElements.define('monaco-editor', MonacoEditor);
  customElements.define('ol-map', OlMap);
  customElements.define('qr-code', QrCode);
  customElements.define('resize-divs', ResizeDivs);
  customElements.define('resize-handle', ResizeHandle);
  customElements.define('side-bar', SideBar);
  customElements.define('syntax-highlight', SyntaxHighlight);
  customElements.define('x-bind', XBind);
  customElements.define('x-if', XIf);
  customElements.define('x-pagination', Pagination);
}
