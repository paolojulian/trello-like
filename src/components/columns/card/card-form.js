import { addCard } from "../../../../api/api";
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
            placeholder="Title"></form-group>

        <form-group
            class="description
            placeholder="Description"></form-group>

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

        this.$title = this._shadowRoot.querySelector('form-group.title');
        this.$description = this._shadowRoot.querySelector('form-group.description');
        this.$submitBtn = this._shadowRoot.querySelector('.submit-btn my-button');
    }

    connectedCallback() {
        this.$submitBtn.addEventListener('onClick', this._handleSubmit.bind(this));
    }

    disconnectedCallback() {
        this.$submitBtn.removeEventListener('onClick', this._handleSubmit.bind(this));
    }

    set columnId (value) {
        this._columnId = value;
        console.log('columnId', value);
    }

    set reloadCards (func) {
        this._reloadCards = func.bind(this);
    }

    _handleSubmit (event) {

        event.preventDefault();

        let payload = {
            columnId: this._columnId,
            card: {
                title: this.$title.value,
                description: this.$description.value
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
        console.error(err);
    }
}

customElements.define('trello-card-form', TrelloCardForm);