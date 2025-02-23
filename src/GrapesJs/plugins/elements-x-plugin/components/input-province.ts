import { Editor } from 'grapesjs';

export default function(editor: Editor) {
  editor.Components.addType('input-province', {
    isComponent: el => el.tagName == 'X-COMBOBOX' && el.classList.contains('input-province'),

    model: {
      defaults: {
        tagName: 'x-combobox',
        droppable: true,
        highlightable: true,
        traits: [
          'select-expr',
          'display-expr',
          {
            type: 'button',
            name: 'edit-html',
            text: 'Edit HTML',
            full: true,
            command: 'html-editor'
          },
          {
            type: 'button',
            name: 'edit-js',
            text: 'Edit Javascript',
            full: true,
            command: 'js-editor'
          },
        ],
      }
    },
    view: { /* onRender({model, el}) {} */ }
  })

  editor.on('component:create', model => {
    if (model.get('type') === 'input-province') {
      model.set('script', function(this) {
        // Your script logic here
        const el = this;
        el.dataList ||= {
          AB : 'Alberta',
          BC : 'British Columbia',
          MB : 'Manitoba',
          NB : 'New Brunswick',
          NL : 'Newfoundland and Labrador',
          NS : 'Nova Scotia',
          NT : 'Northwest Territories',
          NU : 'Nunavut',
          ON : 'Ontario',
          PE : 'Prince Edward Island',
          QC : 'Québec',
          SK : 'Saskatchewan',
          YT : 'Yukon'
        }
      });
    }
  });
}