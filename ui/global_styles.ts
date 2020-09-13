import { css } from 'lit-element';

export const globalStyles = css`
  * {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
    outline: none;
  }
`;

export const inputStyles = css`
  input {
    --color-input-primary: #8899a9;
    --color-input-primary-dark: #34495e;
    --color-input-error: red;
    --color-input-success: green;
    font: inherit;
    outline: none;
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

  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
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
    outline: none;
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
