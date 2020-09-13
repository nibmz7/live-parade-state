import { css } from 'lit-element';

export const globalStyles = css`
  button,
  input,
  .selectable {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }
`;

export const inputStyles = css`
  input {
    --color-input-primary: #8899a9;
    --color-input-primary-dark: #34495e;
    --color-input-error: red;
    --color-input-success: var(--color-input-primary);
    font: inherit;
    margin: 15px 0;
    padding: 5px;
    box-sizing: border-box;
    border: 3px solid;
    border-radius: 3px;
    border-color: var(--color-input-primary);
    transition: border-color 0.5s;
  }

  input:hover {
    border-color: var(--color-input-primary-dark);
  }

  input[invalid] {
    border-color: var(--color-input-error);
  }

  input[valid] {
    border-color: var(--color-input-success);
  }

  input:focus {
    animation: glow 1.5s infinite;
  }

  @keyframes glow {
    0% {
      border-color: var(--color-input-primary);
    }
    50% {
      border-color: var(--color-input-primary-dark);
    }
    100% {
      border-color: var(--color-input-primary);
    }
  }
`;

export const passwordInputStyles = css`
  .password-container {
    position: relative;
  }

  .password-container > input {
    width: 100%;
  }

  .password-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 15px;
    bottom: 15px;
    margin-top: auto;
    margin-bottom: auto;
    fill: rgb(151, 147, 147);
    cursor: pointer;
  }

  .password-toggle::after {
    background-image: radial-gradient(
      circle farthest-side,
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0.12) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -5px;
    right: -5px;
    content: '';
    visibility: hidden;
  }

  .password-toggle:focus::after {
    visibility: visible;
    animation: pulse 0.7s infinite alternate;
  }

  .password-toggle > svg > #stroke {
    transform: scale(0);
    transition: transform 0.3s;
    transform-origin: 10% 10%;
  }

  .password-toggle[visible] > svg > #stroke {
    transform: scale(1);
  }

  @keyframes pulse {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const cardStyles = css`
  .card {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 2px 50px 0px rgba(209, 202, 209, 1);
  }
`;

export const buttonStyles = css`
  button {
    font: inherit;
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s, box-shadow 0.3s;
    background-color: var(--color-primary);
    box-shadow: 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.5);
  }

  @media (hover: hover) {
    button:hover {
      background-color: var(--color-primary-dark);
      box-shadow: 0px 2px 9px 1px rgba(var(--color-primary-dark-rgb), 0.5);
    }
  }

  button:focus,
  button:active {
    background-color: var(--color-primary-dark);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-primary-dark-rgb), 0.5);
  }
`;
