import { addCard } from "../../../../api/api";
import EmptyFieldsException from '../../../../api/exceptions/EmptyFieldsException';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>

    <my-card>
        <span slot="header">Add Card</span>

        <form-group
            class="title"
            placeholder="Title">
        </form-group>
        <form-group-textarea
            class="description"
            placeholder="Description">
        </form-group-textarea>

        <div class="cancel-btn">
            <my-button
                backgroundColor="var(--my-red)"
            >Cancel</my-button>
        </div>
        <div class="submit-btn">
            <my-button>Submit</my-button>
        </div>
    </my-card>
`

class TrelloCardForm extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$host = this._shadowRoot.host;

        this.$title = this._shadowRoot.querySelector('form-group.title');
        this.$description = this._shadowRoot.querySelector('form-group-textarea.description');
        this.$cancelBtn = this._shadowRoot.querySelector('.cancel-btn my-button');
        this.$submitBtn = this._shadowRoot.querySelector('.submit-btn my-button');
    }

    connectedCallback() {
        this.$cancelBtn.addEventListener('onClick', this._close.bind(this));
        this.$submitBtn.addEventListener('onClick', this._handleSubmit.bind(this));
    }

    disconnectedCallback() {
        this.$cancelBtn.addEventListener('onClick', this._close.bind(this));
        this.$submitBtn.removeEventListener('onClick', this._handleSubmit.bind(this));
    }

    _close () {
        this.$host.parentNode.removeChild(this.$host);
    }

    set columnId (value) {
        this._columnId = value;
        console.log('columnId', value);
    }

    set reloadCards (func) {
        this._reloadCards = func.bind(this);
    }

    _handleSubmit () {

        let payload = {
            columnId: this._columnId,
            card: {
                title: this.$title.value.trim().toLowerCase(),
                description: this.$description.value.trim().toLowerCase()
            }
        }

        addCard(payload)
            .then(this._handleSuccess.bind(this))
            .catch(this._handleError.bind(this));

    }

    _handleSuccess (response) {
        this._reloadCards();
    }

    _handleError (err) {
        if (err instanceof EmptyFieldsException) {
            let { errors } = err
            this.$title.error = errors.title;
            this.$description.error = errors.description;
        }
    }
}

customElements.define('trello-card-form', TrelloCardForm);