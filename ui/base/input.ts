import { html } from 'lit-element';
import { onPressed } from '../utils';
import { ifDefined } from 'lit-html/directives/if-defined';

export enum INPUT_VALIDITY {
  PENDING,
  INVALID,
  VALID
}

export interface InputState {
  value: string;
  validity: INPUT_VALIDITY;
}

export interface PasswordInputState extends InputState {
  visible: boolean;
}

export const InputStateDefault = (): InputState => ({
  value: '',
  validity: INPUT_VALIDITY.PENDING
});

export const PasswordStateDefault = (): PasswordInputState => ({
  value: '',
  validity: INPUT_VALIDITY.PENDING,
  visible: false
});

const updateInputValue = (callback: (state: InputState) => void) => {
  return (e: Event) => {
    let input = e.target as HTMLInputElement;
    let inputValue = input.value;
    let inputIsValid: INPUT_VALIDITY = INPUT_VALIDITY.PENDING;
    if (inputValue.length > 0) {
      inputIsValid = input.validity.valid
        ? INPUT_VALIDITY.VALID
        : INPUT_VALIDITY.INVALID;
    }
    callback({ value: inputValue, validity: inputIsValid });
  };
};

export const textInput = (
  inputState: InputState,
  setInputState: (state: InputState) => void,
  options?: {
    placeholder?: string;
    label?: string;
    id?: string;
    changeText?: (text: string) => string;
  },
  reset?: () => void
) => {
  const placeholder = options?.placeholder || '';
  const label = options?.label || '';

  const oninput = (e: Event) => {
    if (options?.changeText) {
      let input = e.currentTarget as HTMLInputElement;
      input.value = options.changeText(input.value);
    }
  };

  const updateValue = updateInputValue((state) => {
    setInputState(state);
  });

  const inputReset = () => {
    setInputState({ ...inputState, validity: INPUT_VALIDITY.PENDING });
    reset?.();
  };

  return html`
    <input
      id="${ifDefined(options?.id)}"
      required
      type="text"
      tabindex="0"
      placeholder="${placeholder}"
      autocomplete="off"
      aria-label="${label}"
      value="${inputState.value}"
      ?invalid="${inputState.validity === INPUT_VALIDITY.INVALID}"
      ?valid="${inputState.validity === INPUT_VALIDITY.VALID}"
      @focus="${inputReset}"
      @blur="${updateValue}"
      @input="${oninput}"
    />
  `;
};

export const emailInput = (
  inputState: InputState,
  setInputState: (state: InputState) => void,
  reset?: () => void
) => {
  const updateValue = updateInputValue((state) => {
    setInputState(state);
  });

  const inputReset = () => {
    setInputState({ ...inputState, validity: INPUT_VALIDITY.PENDING });
    reset?.();
  };

  return html`
    <input
      required
      type="email"
      tabindex="0"
      placeholder="Email"
      autocomplete="off"
      aria-label="Email input"
      value="${inputState.value}"
      ?invalid="${inputState.validity === INPUT_VALIDITY.INVALID}"
      ?valid="${inputState.validity === INPUT_VALIDITY.VALID}"
      @focus="${inputReset}"
      @blur="${updateValue}"
    />
  `;
};

export const passwordInput = (
  inputState: PasswordInputState,
  setInputState: (state: PasswordInputState) => void,
  reset?: () => void,
  submit?: (e: Event) => void
) => {
  const updateValue = updateInputValue((state) => {
    setInputState(state as PasswordInputState);
  });

  const togglePasswordVisiblity = onPressed(
    () => setInputState({ ...inputState, visible: !inputState.visible }),
    {
      autoBlur: false,
      debounce: false
    }
  );

  const inputReset = () => {
    setInputState({ ...inputState, validity: INPUT_VALIDITY.PENDING });
    reset?.();
  };

  return html`
    <div class="password-container">
      <input
        required
        tabindex="0"
        minlength="8"
        placeholder="Password"
        aria-label="Password input"
        autocomplete="current-password"
        value="${inputState.value}"
        type="${inputState.visible ? 'text' : 'password'}"
        ?invalid="${inputState.validity === INPUT_VALIDITY.INVALID}"
        ?valid="${inputState.validity === INPUT_VALIDITY.VALID}"
        @focus="${inputReset}"
        @blur="${updateValue}"
        @keydown="${(e: Event) => {
          let key = (e as KeyboardEvent).key;
          if (key === 'Enter') {
            submit?.(e);
          }
        }}"
      />

      <div
        tabindex="0"
        aria-label="Toggle password visibility"
        class="password-toggle selectable"
        @click="${togglePasswordVisiblity}"
        @keydown="${togglePasswordVisiblity}"
        ?visible="${inputState.visible}"
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
