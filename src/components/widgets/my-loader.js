const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        .loader {
            border: 16px solid #f3f3f3; /* Light grey */
            border-top: 16px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            animation: spin 2s linear infinite;
        }
            
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>

    <div class="loader"></div>
`

class MyLoader extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('my-loader', MyLoader);