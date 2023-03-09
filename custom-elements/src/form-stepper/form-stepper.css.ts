export default /* css */ `
  form-stepper {
    --label-size: 32px;
    --max-width: 200px;
    display: flex;
  }
  
  form-stepper .form-step {
    flex: 1; /* stretch width */
    display: flex;
    justify-content: center;
    position: relative;
  }

  form-stepper .form-step .form-link {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: var(--max-width);
    cursor: pointer;
  }

  form-stepper .form-step .form-link .form-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--label-size);
    height: var(--label-size);
    font-size: 16px;
    border: 1px solid;
    border-radius: 50%;
    border-color: #b2b2b2;
    color: #1a1a1a;
    background-color: #fff;
    form-link-shadow: 0 0 0 4px #FFF;
  }

  form-stepper .form-step.incomplete .form-link {
    cursor: auto;
  }

  form-stepper .form-step.active .form-link {
    font-weight: 600;
  }

  form-stepper .form-step:is(.complete, .active, .skipped, .error) .connection-line {
    background-color: #90caf9;
  }

  form-stepper .form-step:is(.complete, .active, .skipped) .form-link .form-label {
    color: #FFF;
    border-color: #1976d2;
    background-color: #1976d2;
  }

  form-stepper .form-step:is(.error) .form-link .form-label {
    color: #FFF;
    border-color: #d27519;
    background-color: #d27519;
  }

  form-stepper .form-step .form-link .form-title {
    padding-top: .2rem;
    word-wrap: break-word;
  }

  form-stepper .form-step .form-link .form-desc {
    color: grey;
  }

  form-stepper .form-step .connection-line {
    position: absolute;
    width: 100%;
    background-color: #EEE;
    height: 4px;
    right: 50%;
    top: calc( var(--label-size) / 2);
    z-index: -1;
  }
`;