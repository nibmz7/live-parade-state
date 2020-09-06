import { css } from 'lit-element';

export const inputStyles = css`
  input {
    --color-primary: #8899a9;
    --color-primary-dark: #34495e;
    margin: 15px 0;
    outline: none;
    border: 3px solid;
    border-color: var(--color-primary);
    border-radius: 3px;
    padding: 5px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input[invalid] {
    --color-primary: pink;
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

  input:focus {
    animation: glow 1.5s infinite;
  }

  @keyframes glow {
    0% {
      border-color: var(--color-primary);
    }
    50% {
      border-color: var(--color-primary-dark);
    }
    100% {
      border-color: var(--color-primary);
    }
  }
`;

export const cardStyles = css`
  .card {
    background: white;
    box-shadow: 0px 2px 50px 0px rgba(209, 202, 209, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const buttonStyles = css`
  button {
    font: inherit;
    font-size: 1.3rem;
    padding: 15px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    color: white;
    background: var(--color-primary);
    width: 100%;
    transition: all 0.2s;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2),
      0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
  }
`;
