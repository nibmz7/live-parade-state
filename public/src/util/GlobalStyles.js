export const inputStyle = `
    input {
        --color-primary: #8899a9;
        --color-primary-dark: #34495e;
        font: inherit;
        margin: 15px 0;
        outline: none;
        border: 3px solid;
        border-color: #b9b9b9;
        border-radius: 3px;
        padding: 5px;
        font-size: 1rem;
        transition: border-color .2s;
    }

    input:focus {
        animation: glow 1.5s infinite;
    }
        
    @keyframes glow {
        0% { border-color: var(--color-primary); }
        50% { border-color: var(--color-primary-dark); }
        100% { border-color: var(--color-primary); }
    }
`;

export const cardStyle = `
    .card {
        background: white;
        box-shadow: 0px 2px 50px 0px rgba(209, 202, 209, 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`; 