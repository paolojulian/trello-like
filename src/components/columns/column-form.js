import { addColumn } from "../../../api/api";
import EmptyFieldsException from '../../../api/exceptions/EmptyFieldsException';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
        }
    </style>

    <my-modal>
        <span slot="header">Add Column</span>
        <form>
            <form-group
                name=""
                placeholder="Title"
            ></form-group>
            <my-button>
                SUBMIT
            </my-button>
        </form>
    </my-modal>
`

class TrelloColumnForm extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$host = this._shadowRoot.host;

        this.$modal = this._shadowRoot.querySelector('my-modal');

        this.$form = this._shadowRoot.querySelector('form');

        this.$title = this._shadowRoot.querySelector('form-group')

        this.$submitButton = this._shadowRoot.querySelector('my-button');
    }

    connectedCallback() {
        this.$modal.addEventListener('onClose', this._close.bind(this));
        this.$form.addEventListener('submit', this._handleSubmit.bind(this));
        this.$submitButton.addEventListener('onClick', this._handleSubmit.bind(this))
    }

    disconnectedCallback() {
        this.$modal.removeEventListener('onClose', this._close.bind(this));
        this.$form.removeEventListener('submit', this._handleSubmit.bind(this));
        this.$submitButton.removeEventListener('onClick', this._handleSubmit.bind(this))
    }

    _close () {
        this.$host.parentNode.removeChild(this.$host);
    }

    set columnId (value) {
        this._columnId = value;
        console.log('columnId', value);
    }

    _handleSubmit () {

        let payload = {
            title: this.$title.value,
        }

        addColumn(payload)
            .then(this._handleSuccess.bind(this))
            .catch(this._handleError.bind(this));

    }

    _handleSuccess (response) {
        this.dispatchEvent(new Event('onSuccess', response));
        this._close();
    }

    _handleError (err) {
        if (err instanceof EmptyFieldsException) {
            let { errors } = err
            this.$title.error = errors.title;
        }
    }
}

customElements.define('trello-column-form', TrelloColumnForm);