const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            --background-color: '#2d9cb',
            --color: '#FAFAFA'
        }
        button {
            border: 0;
            box-sizing: border-box;
            outline: none;
            padding: 0.5rem;
            font-size: 18px;
            border-radius: 5px;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
            margin: 0.5rem 0;
            width: 100%;
            border: 1px solid var(--background-color);
            background-color: var(--background-color);
            color: var(--color);
            transition: all 100ms ease-in-out;

            cursor: pointer;
        }
        button:hover {
            background-color: var(--color);
            color: var(--background-color);
        }
    </style>

    <button type="button">
        <slot></slot>
    </button>
`

class MyButton extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$button = this._shadowRoot.querySelector('button');
    }

    connectedCallback () {
        if ( ! this.hasAttribute('backgroundColor'))
            this.setAttribute('backgroundColor', '#2D9CDB');

        if ( ! this.hasAttribute('color'))
            this.setAttribute('color', '#FAFAFA');

        if ( ! this.hasAttribute('fab-size'))
            this.setAttribute('fab-size', 'md');

        this._shadowRoot.host.style.setProperty('--background-color', this.getAttribute('backgroundColor'))
        this._shadowRoot.host.style.setProperty('--color', this.getAttribute('color'))

        if (this.hasAttribute('fab')) {
            this.$button.style.padding = '0';
            switch (this.getAttribute('fab-size')) {
                case 'sm':
                    this.$button.style.fontSize = '0.7rem';
                    this.$button.style.width = '1.5rem';
                    this.$button.style.height = '1.5rem';
                    this.$button.style.borderRadius = '50%';
                    break;
                case 'md':
                    this.$button.style.width = '2.5rem';
                    this.$button.style.height = '2.5rem';
                    this.$button.style.borderRadius = '50%';
                    break;
                case 'lg':
                    break;
            }
        }

        this.$button.addEventListener('click', (e) => { this.dispatchEvent(new Event('onClick')) });
    }

    disconnectedCallback () {
        this.$button.removeEventListener('click', (e) => { this.dispatchEvent(new Event('onClick', {})) });
    }

}

customElements.define('my-button', MyButton);