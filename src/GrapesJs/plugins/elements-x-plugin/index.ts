import type { BlockProperties, Editor, PluginOptions } from 'grapesjs';
import components from './components';
import blocks from './blocks';
import commands from './commands';
import style from './style.css';

export default function(editor: Editor, options: PluginOptions) {
  commands(editor);
  components(editor);
  blocks(editor, options as BlockProperties);

  editor.setStyle( options.css || style);
};