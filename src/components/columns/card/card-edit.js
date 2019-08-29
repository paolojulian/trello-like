import { editCard } from "../../../../api/api";
import EmptyFieldsException from '../../../../api/exceptions/EmptyFieldsException';
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

        <my-button class="submit-btn">
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

        this.$submitBtn = this.$modal.querySelector('.submit-btn');
    }

    connectedCallback() {
        this.$modal.addEventListener('onClose', this._close.bind(this));
        this.$submitBtn.addEventListener('onClick', this._handleSubmit.bind(this));
    }

    disconnectedCallback() {
        this.$modal.removeEventListener('onClose', this._close.bind(this));
        this.$submitBtn.removeEventListener('onClick', this._handleSubmit.bind(this));
    }

    set id (value) {
        this._cardId = value
    }

    set columnId (value) {
        this._columnId = value
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

    _handleSubmit () {
        const payload = {
            cardId: this._cardId,
            card: {
                columnId: this._columnId,
                title: this.$title.value,
                description: this.$description.value
            }
        }
        editCard(payload)
            .then(this._handleSuccess.bind(this))
            .catch(this._handleError.bind(this));
    }
    _handleSuccess () {
        this.dispatchEvent(new Event('onSuccess', {}));
        this._close();
    }

    _handleError (err) {
        if (err instanceof EmptyFieldsException) {
            let { errors } = err
            this.$title.error = errors.title;
            this.$description.error = errors.description;
        }
    }

}

customElements.define('card-edit', CardEdit);