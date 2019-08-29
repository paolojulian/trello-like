import { deleteCard } from '../../../../api/api';
import './card-modal';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        .card {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            margin: 1rem 0;
            cursor: pointer;
            overflow: hidden;
            transition: all 200ms ease-in-out;
            user-select: none;
        }
        .card:hover {
            background-color: #EEEEEE;
        }
        .card:hover .header {
            background-color: var(--my-secondary);
            color: var(--my-font-white);
        }
        .header {
            position: relative;
            padding: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            transition: all 200ms ease-in-out;
        }
        .content {
            padding: 1rem;
            line-height: 1.2rem;
            font-weight: 400;
            color: var(--my-font-black-secondary);
            letter-spacing: 1px;
            max-height: 100px;
            overflow: auto;
        }
        .delete {
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
        }
    </style>

    <div class="card">
        <div class="header">
            <span id="title"></span>
            <my-button
                class="delete"
                backgroundColor="#EB5757"
                fab
                fab-size="sm">
                X
            </my-button>
        </div>
        <div class="content">
            <span id="description"></span>
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
        this.$deleteBtn = this._shadowRoot.querySelector('.delete');
        
    }

    connectedCallback() {
        this.$deleteBtn.addEventListener('onClick', this._deleteCard.bind(this));
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