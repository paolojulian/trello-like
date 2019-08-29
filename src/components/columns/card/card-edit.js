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
            font-weight: 400;
            color: var(--my-font-black);
            letter-spacing: 1px;
            line-height: 1.5rem;
        }
    </style>

    <my-modal>

        <span slot="header">
            Edit Card
        </span>

        <form-group
            class="card-title"
            placeholder="Title"
        >
        </form-group>

        <form-group-textarea
            class="card-description"
            placeholder="Description"
        >
        </form-group-textarea>

        <my-button>
            Submit
        </my-button>

    </my-modal>
`

class CardEdit extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$host = this._shadowRoot.host;
        this.$modal = this._shadowRoot.querySelector('my-modal');
        this.$title = this.$modal.querySelector('.card-title');
        this.$description = this.$modal.querySelector('.card-description');
        console.log(this.$description)
    }

    connectedCallback() {
        this.$modal.addEventListener('onClose', this._close.bind(this));
    }

    disconnectedCallback() {
        this.$modal.removeEventListener('onClose', this._close.bind(this));
    }

    set title (value) {
        this.$title.value = value;
    }

    set description (value) {
        this.$description.value = value;
    }

    _close () {
        this.$host.parentNode.removeChild(this.$host);
    }

}

customElements.define('card-edit', CardEdit);