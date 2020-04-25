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

export const listItemStyle = `
      <style>
         #primary-text {
              text-transform: capitalize;
           color: #323232;
            font-weight: 700;
        }
        #secondary-text {
        color: #878787;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
            .list-item {
              padding: 10px 15px;
              transition: .3s background;
              cursor: pointer;
            }
        
            .list-item:active {
                background: #F0F0F0;
              }
        
              .list-item:first-child {
                border-top: 2px dashed var(--color-primary);
              }
        
              .list-item:last-child {
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
              }
        
              .list-item > p {
                margin: 0;
              }
              
          </style>
          
              <template id="list-item">
                  <div class="list-item">
                      <p id="primary-text"></p>
                      <p id="secondary-text"></p>
                  </div>
              </template>
`;