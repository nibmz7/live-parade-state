import { css } from 'lit-element';

export const slideAnimation = css`
  @keyframes slide-in {
    from {
      opacity: calc(1 - var(--should-fade));
      transform: translateY(var(--offset-y));
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const fadeAnimation = css`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const globalStyles = css`
  button,
  input,
  .selectable {
    outline: none;
  }
`;

export const inputStyles = css`
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

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
    box-shadow: rgb(101 101 101 / 30%) 0px 1px 5px 0px;
  }
`;

export const buttonStyles = css`
  button {
    font: inherit;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  button[solid] {
    color: white;
    background-color: var(--color-primary);
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.5);
  }

  button[plain] {
    --color-primary-dark: rgba(0, 0, 0, 0.1);
    color: var(--color-primary);
    background-color: transparent;
    transition: background-color 0.3s;
  }

  button[outline] {
    background: white;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    --color-primary-dark: rgb(228 228 228);
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  @media (hover: hover) {
    button[solid]:hover,
    button[outline]:hover {
      background-color: var(--color-primary-dark);
      box-shadow: 0px 2px 9px 1px rgba(var(--color-primary-dark-rgb), 0.5);
    }
    button[plain]:hover {
      background-color: var(--color-primary-dark);
    }
  }

  button[solid]:focus,
  button[solid]:active,
  button[outline]:focus,
  button[outline]:active {
    background-color: var(--color-primary-dark);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-primary-dark-rgb), 0.5);
  }

  button[plain]:focus,
  button[plain]:active {
    background-color: var(--color-primary-dark);
  }

  button[static],
  button[static]:hover,
  button[static]:focus,
  button[static]:active {
    box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2),
      0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
  }
`;
