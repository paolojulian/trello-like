// import { addColumn } from "../../../../api/api";
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
        }
        .card-details {
            padding-bottom: 100px;
        }
        .card-title {
            color: #2D9CDB;
        }
        .card-description {
            font-weight: 200;
            letter-spacing: 1px;
            line-height: 1.5rem;
        }
    </style>

    <my-modal>

        <span
            class="card-title"
            slot="header">
            Card
        </span>

        <div class="card-details">
            <div class="card-description"></div>
        </div>

    </my-modal>
`

class CardModal extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$host = this._shadowRoot.host;
        this.$modal = this._shadowRoot.querySelector('my-modal');
        this.$title = this.$modal.querySelector('.card-title');
        this.$description = this.$modal.querySelector('.card-description');
    }

    connectedCallback() {
        this.$modal.addEventListener('onClose', this._close.bind(this));
    }

    disconnectedCallback() {
        this.$modal.removeEventListener('onClose', this._close.bind(this));
    }

    set title (value) {
        this.$title.innerHTML = value;
    }

    set description (value) {
        this.$description.innerHTML = value;
    }

    _close () {
        this.$host.parentNode.removeChild(this.$host);
    }

}

customElements.define('card-modal', CardModal);