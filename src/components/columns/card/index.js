import { deleteCard } from '../../../../api/api';
import './card-modal';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            width: 300px;
            border-radius: 10px;
            margin: 2rem 0;
            cursor: pointer;
        }
        .header {
            padding: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        }
        .content {
            padding: 10px;
            line-height: 1.2rem;
            font-weight: 300;
        }
    </style>

    <div class="card">
        <div class="header">
            <button
                type="button"
                class="delete">
                Delete
            </button>
        </div>
        <div class="content">
            <p id="title"></p>
            <p id="description"></p>
        </div>
    </div>
`

class MyColumn extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$card = this._shadowRoot.querySelector('.card');
        this.$title = this._shadowRoot.querySelector('#title');
        this.$description = this._shadowRoot.querySelector('#description');
        this.$deleteBtn = this._shadowRoot.querySelector('button.delete');
        
    }

    connectedCallback() {
        this.$deleteBtn.addEventListener('click', this._deleteCard.bind(this));
        this.$card.addEventListener('click', this._viewCard.bind(this));
    }

    disconnectedCallback() {
        this.$deleteBtn.removeEventListener('click', this._deleteCard.bind(this));
        this.$card.removeEventListener('click', this._viewCard.bind(this));
    }

    set card (value) {
        this._card = value;
        this._renderCard();
    }

    set reloadCards (value) {
        this._reloadCards = value.bind(this);
    }

    _renderCard () {
        this.$title.innerHTML = this._card.title;
        this.$description.innerHTML = this._card.description;
    }

    _deleteCard () {
        deleteCard(this._card.id)
            .then(this._handleDeletionSuccess.bind(this))
            .catch(this._handleDeletionError.bind(this))
    }

    _handleDeletionSuccess() {
        // TODO
        this._reloadCards();
    }

    _handleDeletionError(err) {
        // TODO
        console.error(err);
    }

    /**
     * Opens a modal to view details of the card,
     * can also edit the details of the card
     */
    _viewCard () {
        let $cardModal = document.createElement('card-modal');
        $cardModal.title = this._card.title;
        $cardModal.description = this._card.description;
        this._shadowRoot.appendChild($cardModal);
    }
}

customElements.define('trello-card', MyColumn);