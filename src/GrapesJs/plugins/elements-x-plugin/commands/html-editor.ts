import { Command, Editor } from 'grapesjs';
import pretty from 'pretty';

export const htmlEditorCommand : Command = {
  run(editor:Editor, _sender, _options) {
    const codeViewer = editor.CodeManager
      .createViewer({
        codeName: 'htmlmixed',
        readOnly: 0,
        theme: 'hopscotch',
        autoBeautify: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true,
        tabSize: 2, // Set the tab size
        indentUnit: 2, // Set the indent unit
      });
    const htmlStr = editor.getSelected()?.toHTML();
    codeViewer.setContent(pretty(htmlStr));

    const applyBtn = document.createElement('button');
    applyBtn.innerText = 'Apply';
    applyBtn.addEventListener('click', () => {
      const htmlCode = codeViewer.getContent();
      editor.select(editor.getSelected()?.replaceWith(htmlCode));
      editor.Modal.close();
    });

    const modalContent = document.createElement('div');
    modalContent.append(codeViewer.getElement(), applyBtn);

    const modal = editor.Modal.open({title: 'Edit HTML', content: modalContent});
    modal.getModel().once('change:open', () => editor.stopCommand(this.id as string));
  },

  stop: (editor: Editor) => editor.Modal.close()
};