export const formType = {
  isComponent: el => el.tagName === 'FORM',

  model: {
    defaults: {
      tagName: 'form',
      testprop: 1,
      droppable: false,
      draggable: false,
      traits: [ 'id', 'title', ],
    },
  },

  view: {
    events: {
      // 'dblclick button': e => console.debug(`dblclick form button`),
      // submit: 'onFormSubmit'
    },

    onFormSubmit(event) {
    },

    init({ model }) {
    },

    removed() {
    },

    onRender() {
    },
  },
}