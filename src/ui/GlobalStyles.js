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

const parseTime = time => (`${(time/1000).toFixed(1)}s`);

export const fadeAnim = (fadeInTime = 5000, fadeOutTime = 3000) => `
    .fade-in {
        animation: fade-in ${parseTime(fadeInTime)};
    }

    .fade-out {
        animation: fade-out ${parseTime(fadeOutTime)};
    }

    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    @keyframes fade-out {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;

export const slideAnim = (offsetYIn = 100, offsetYOut = 100) => `
    @keyframes slide-in {
        0% { transform: translateY(${offsetYIn}px); }
        100% { transform: translateY(0px); }
    }

    @keyframes slide-out {
        100% { transform: translateY(${offsetYOut}px); }
    }
`;

export const scaleAnim = (scaleIn = 1.1, scaleOut = 1.1) => `
    @keyframes scale-in {
        0% { 
            transform: scale(${scaleIn});
        }
        100% { 
            transform: scale(1);
        }
    }

    @keyframes scale-out {
        0% { 
            transform: scale(1);
        }
        100% { 
            transform: scale(${scaleOut});
        }
    }
`

export const shakeAnim = `
    #dialogue.shake {
        animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    }

    @keyframes shake {
    10%, 90% {
        transform: translateX(-1px);
        }

    20%, 80% {
        transform: translateX(2px);
        }

        30%, 50%, 70% {
        transform: translateX(-4px);
        }

        40%, 60% {
        transform: translateX(4px);
        }
    }
`;

