import { html } from 'lit-element';
import { onPressed } from './utils';

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
  const updateValue = updateInputValue((value, state) => {
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
      @blur="${updateValue}"
    />
  `;
};

export const passwordInput = (
  inputValue: string,
  inputState: INPUT_STATE,
  visible: boolean,
  setValue: (email: string) => void,
  setState: (state: INPUT_STATE) => void,
  setVisibility: (visible: boolean) => void
) => {
  const updateValue = updateInputValue((value, state) => {
    setValue(value);
    setState(state);
  });

  const togglePasswordVisiblity = onPressed(() => setVisibility(!visible), {
    autoBlur: false,
    debounce: false
  });

  return html`
    <div class="password-container">
      <input
        required
        tabindex="0"
        minlength="8"
        placeholder="Password"
        aria-label="Password input"
        autocomplete="current-password"
        value="${inputValue}"
        type="${visible ? 'text' : 'password'}"
        ?invalid="${inputState === INPUT_STATE.INVALID}"
        ?valid="${inputState === INPUT_STATE.VALID}"
        @focus="${() => setState(INPUT_STATE.PENDING)}"
        @blur="${updateValue}"
      />

      <div
        tabindex="0"
        aria-label="Toggle password visibility"
        class="password-toggle selectable"
        @click="${togglePasswordVisiblity}"
        @keydown="${togglePasswordVisiblity}"
        ?visible="${visible}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
          <path
            id="stroke"
            d="m2.71,3.16c-0.39,0.39 -0.39,1.02 0,1.41l16.32,16.33c0.39,0.39 1.02,0.39 1.41,0c0.39,-0.39 0.39,-1.02 0,-1.41l-16.31,-16.33c-0.39,-0.39 -1.03,-0.39 -1.42,0z"
          />
        </svg>
      </div>
    </div>
  `;
};
