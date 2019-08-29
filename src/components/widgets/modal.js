const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            position: fixed;
            left: 0;
            top: 0;
            display: block;
            color: #131313;
            z-index: 1;
            width: 100%;
            height: 100%;
            padding-top: 100px;
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        .modal-content {
            width: 600px;
            max-width: 100%;
            max-height: 100%;
            margin: auto;
            background-color: #fafafa;
            border-radius: 10px;
        }
        .modal-header {
            position: relative;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.10);
            padding: 1rem;
            box-sizing: border-box;
        }
        .modal-close {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        .modal-close button {
            outline: none;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: none;
            color: #FAFAFA;
            background-color: #EB5757;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            transition: all 200ms ease-in-out;
        }
        .modal-close button:hover {
            background-color: #FAFAFA;
            color: #EB5757;
        }
        .modal-body {
            box-sizing: border-box;
            padding: 1rem;
            height: 100%;
            max-height: calc(100vh - 190px);
            overflow-y: auto;
        }
    </style>

    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header"></slot>
                <div class="modal-close">
                    <button type="button">X</button>
                </div>
            </div>

            <div class="modal-body">
                <slot>
                    Body
                </slot>
            </div>
        </div>
    </div>
`

class MyModal extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$closeBtn = this._shadowRoot.querySelector('.modal-close button');
    }

    connectedCallback() {
        this.$closeBtn.addEventListener('click', (e) => { this.dispatchEvent(new Event('onClose', {})) });
    }

    disconnectedCallback() {
        this.$closeBtn.removeEventListener('click', (e) => { this.dispatchEvent(new Event('onClose', {})) });
    }

}

customElements.define('my-modal', MyModal);