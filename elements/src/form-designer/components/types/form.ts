
const formScript = function(this:any) {
  const controls = Array.from(this.elements)
    .filter( (el: any) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName));
  
  controls.forEach( (el: any) => {
    el.addEventListener('blur', event => 
      el.classList.add(el.checkValidity() ? 'is-valid' : 'is-invalid')
    );
  });

  this.addEventListener('submit', event => {
    controls.forEach( (el: any) => {
      el.classList.add(el.checkValidity() ? 'is-valid' : 'is-invalid')
    }); 
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  })
};

export const formType = {
  isComponent: el => el.tagName === 'FORM',

  model: {
    defaults: {
      script: formScript,
      tagName: 'form',
      testprop: 1,
      droppable: ':not(form)',
      draggable: ':not(form)',
      traits: [
        'id', 
        'title',
        'method',
        'action'
      ],
    },
  },

  view: {
    events: {
      'dblclick button': e => console.debug(`dblclick form button`),
      submit: 'onFormSubmit'
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