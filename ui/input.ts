import { html } from 'lit-element';

export const enum INPUT_STATE {
  PENDING,
  INVALID,
  VALID
}

const updateInputValue = (
  callback: (value: any, isValid: INPUT_STATE) => void
) => {
  return (e: Event) => {
    let input = e.target as HTMLInputElement;
    let inputValue = input.value;
    let inputIsValid: INPUT_STATE = INPUT_STATE.PENDING;
    if (inputValue.length > 0) {
      inputIsValid = input.validity.valid
        ? INPUT_STATE.VALID
        : INPUT_STATE.INVALID;
    }
    callback(inputValue, inputIsValid);
  };
};

export const emailInput = (
  inputValue: string,
  inputState: INPUT_STATE,
  setValue: (email: string) => void,
  setState: (state: INPUT_STATE) => void
) => {
  const updateEmailValue = updateInputValue((value, state) => {
    setValue(value);
    setState(state);
  });

  return html`
    <input
      required
      type="email"
      tabindex="0"
      placeholder="Email"
      autocomplete="username"
      aria-label="Email input"
      value="${inputValue}"
      ?invalid="${inputState === INPUT_STATE.INVALID}"
      ?valid="${inputState === INPUT_STATE.VALID}"
      @focus="${() => setState(INPUT_STATE.PENDING)}"
      @blur="${updateEmailValue}"
    />
  `;
};
