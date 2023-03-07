export default /* css */ `
  form-stepper {
    --label-size: clamp(1.5rem, 5vw, 3rem);
    --spacing: clamp(0.25rem, 2vw, 0.5rem);
    display: flex;
  }

  form-stepper .form-step {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;
  }

  form-stepper .form-step .form-label {
    display: block;
    width: var(--label-size);
    height: var(--label-size);
    border-radius: 50%;
    background-color: red;
  }

  form-stepper .form-step .form-title {
    font-weight: bold;
    font-size: clamp(1rem, 4vw, 1.25rem);
    margin-bottom: 0.5rem;
    margin: .5rem 0 0 0;
  }

  form-stepper .form-step .form-desc {
    color: grey;
    font-size: clamp(0.85rem, 2vw, 1rem);
    padding-left: var(--spacing);
    padding-right: var(--spacing);
  }

  form-stepper .form-step:not(:last-child) .connection-line {
    position: relative;
    top: calc(var(--circle-size) / 2);
    width: calc(100% - var(--circle-size) - calc(var(--spacing) * 2));
    left: calc(50% + calc(var(--circle-size) / 2 + var(--spacing)));
    height: 2px;
    background-color: #e0e0e0;
    order: -1;
  }
`;