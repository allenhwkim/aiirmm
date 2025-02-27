import grapesjs, {Editor, usePlugin} from 'grapesjs';
import grapesjsParserPostCss from 'grapesjs-parser-postcss';
import grapesjsStyleBg from 'grapesjs-style-bg';
import formsPlugin from './plugins/forms-plugin'; // <form>, <input> ...
import styleManager from './style-manager';
import elementsXPlugin from './plugins/elements-x-plugin';
import bsBasicPlugin from './plugins/bootstrap-basic';
import bsPadPlugin from './plugins/bootstrap-pad';

import 'grapesjs/dist/css/grapes.min.css';
import { useEffect, useRef } from 'react';
import './style.css';

export default function(props: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: ref.current as HTMLElement,
      plugins: [
        // cleaner css, https://grapesjs.com/docs/guides/Custom-CSS-parser.html#plugins
        grapesjsParserPostCss,

        // Style manger - background
        grapesjsStyleBg,

        // bootstrap grid, text, link, image
        usePlugin(bsBasicPlugin, {category: 'Bootstrap5 Basic'}),

        // bootstrap padding change by click
        usePlugin(bsPadPlugin, {typesToApply: ['div', 'bs-row', 'bs-col', '']}),

        // form, input, label, textarea, checkbox, radio, select, optioon
        usePlugin(formsPlugin, {category: 'Form Control'}),

        // custom input + stepper css
        usePlugin(elementsXPlugin, {category: 'Form Inputs'}),
      ],
      storageManager: false,
      styleManager,
      canvas: {
        scripts: [
          'https://unpkg.com/elements-x',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        ],
        styles: [
          'https://unpkg.com/elements-x/dist/lib/style.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        ],
      },
      ...props
    }) as Editor;

    editor.on('load', () => props.onLoad?.(editor));

    ref.current?.addEventListener('keydown', event => {
      event.stopPropagation(); // Reactflow is listenting on document-level
    });

  }, [])

  return (
    <div ref={ref} tabIndex={0}></div>
  )

}