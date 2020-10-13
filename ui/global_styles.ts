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
    color: var(--color-text-light);
    background-color: var(--bg-primary-light);
  }

  input::placeholder {
    color: var(--color-input-hint);
  }

  input {
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
      border-color: var(--color-input-primary-dark);
    }
    50% {
      border-color: var(--color-input-primary);
    }
    100% {
      border-color: var(--color-input-primary-dark);
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
    fill: var(--color-input-password);
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--bg-primary-light);
    box-shadow: var(--color-shadow) 0px 1px 5px 0px;
  }
`;

export const buttonStyles = css`
  button {
    font: inherit;
    cursor: pointer;
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }

  button[solid] {
    color: var(--color-text-light);
    background-color: var(--color-primary);
    box-shadow: 0 1px 5px 0px rgba(var(--color-shadow-primary-rgb), 0.5);
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  button[plain] {
    color: var(--color-primary);
    background-color: transparent;
    transition: background-color 0.3s;
  }

  button[outline] {
    color: var(--color-primary);
    border-width: 2px;
    border-style: solid;
    border-color: var(--color-primary);
    background-color: var(--bg-primary-light);
    box-shadow: 0 1px 5px 0px rgba(var(--color-shadow-primary-rgb), 0.5);
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s,
      border-color 0.3s;
  }

  @media (hover: hover) {
    button[solid]:hover {
      background-color: var(--color-primary-dark);
      box-shadow: 0px 2px 9px 1px
        rgba(var(--color-shadow-primary-dark-rgb), 0.5);
    }
    button[outline]:hover {
      border-color: var(--color-primary-dark);
      background-color: var(--hover-highlight);
      box-shadow: 0px 2px 9px 1px
        rgba(var(--color-shadow-primary-dark-rgb), 0.5);
    }
    button[plain]:hover {
      background-color: var(--hover-highlight);
    }
  }

  button[solid]:focus,
  button[solid]:active {
    background-color: var(--color-primary-dark);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-shadow-primary-dark-rgb), 0.5);
  }

  button[outline]:focus,
  button[outline]:active {
    border-color: var(--color-primary-dark);
    background-color: var(--hover-highlight);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-shadow-primary-dark-rgb), 0.5);
  }

  button[plain]:focus,
  button[plain]:active {
    background-color: var(--color-primary-dark);
  }

  button[static],
  button[static]:hover,
  button[static]:focus,
  button[static]:active {
    box-shadow: 0 4px 6px -1px rgba(var(--color-shadow-primary-rgb), 0.2),
      0 2px 4px -1px rgba(var(--color-shadow-primary-rgb), 0.12);
  }
`;
