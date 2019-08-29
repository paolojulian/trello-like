import { editColumn, deleteColumn, fetchCardsByColumn } from '../../../api/api';
import EmptyFieldsException from '../../../api/exceptions/EmptyFieldsException';
import './card';
import './card/card-form';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        .hidden {
            display: none;
        }
        div.column {
            flex: 1;
            margin: 0 0.5rem;
            width: 300px;
            max-width: 100%;
        }
        .column-header {
            position: relative;
        }
        .column-header #title {
            margin-right: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 400;
            font-size: 1.2rem;
        }
        .actions {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
        }
        .title-input {

        }
    </style>
    <div class="column">
        <div class="column-header">
            <h2 id="title"></h2>

            <form-group
                class="title-input hidden"
                placeholder="Title"
            >
            </form-group>

            <span class="actions">
                <my-button
                    class="submit-edit-column hidden"
                    fab
                    fab-size="sm"
                    backgroundColor="var(--my-green)"
                >
                    S
                </my-button>
                <my-button
                    class="edit-column"
                    fab
                    fab-size="sm"
                >
                    E
                </my-button>
                <my-button
                    class="remove-column"
                    fab
                    fab-size="sm"
                    backgroundColor="#EB5757"
                >
                    X
                </my-button>
            </span>
        </div>

        <div id="cards"></div>
        <div class="add-card">
            <my-button
                id="add-card"
            >
                ADD CARD
            </my-button>
        </div>
    </li>
`

class TrelloColumn extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$title = this._shadowRoot.querySelector('#title');
        this.$titleInput = this._shadowRoot.querySelector('.title-input');

        this.$cardList = this._shadowRoot.querySelector('#cards');

        this.$addCard = this._shadowRoot.querySelector('.add-card my-button');
        this.$removeColumn = this._shadowRoot.querySelector('.remove-column');
        this.$editColumn = this._shadowRoot.querySelector('.edit-column');
        this.$submitEditColumn = this._shadowRoot.querySelector('.submit-edit-column');
    }

    connectedCallback() {
        this.$addCard.addEventListener('onClick', this._addCard.bind(this));
        this.$removeColumn.addEventListener('onClick', this._removeColumn.bind(this));
        this.$editColumn.addEventListener('onClick', this._editColumn.bind(this));
        this.$submitEditColumn.addEventListener('onClick', this._submitEditColumn.bind(this));
    }

    disconnectedCallback() {
        this.$addCard.removeEventListener('click', this._addCard.bind(this));
        this.$removeColumn.removeEventListener('onClick', this._removeColumn.bind(this));
        this.$editColumn.removeEventListener('onClick', this._editColumn.bind(this));
        this.$submitEditColumn.removeEventListener('onClick', this._submitEditColumn.bind(this));
    }

    set column (value) {
        this._column = value;
        this._renderColumn();
    }

    get column () {
        return 
    }

    async _fetchCards () {
        try {

            const cards = await fetchCardsByColumn(this._column.id);
            this._renderCards(cards);

        } catch (err) {
            // TODO
        }
    }

    _renderColumn () {
        this.$title.innerHTML = this._column.title;
        this._renderCards(this._column.cards);
    }

    _renderCards (cards) {
        this.$cardList.innerHTML = '';
        cards.forEach(this._renderCard.bind(this));
    }

    _renderCard (card) {
        let $cardItem = document.createElement('trello-card');
        $cardItem.card = card;
        $cardItem.reloadCards = this._fetchCards.bind(this);
        this.$cardList.appendChild($cardItem);
    }

    _addCard () {
        let $cardForm = document.createElement('trello-card-form');
        $cardForm.columnId = this._column.id;
        $cardForm.reloadCards = this._fetchCards.bind(this);
        
        this.$cardList.appendChild($cardForm);
        $cardForm.scrollIntoView({behavior: 'smooth'});
    }

    _removeColumn () {
        deleteColumn(this._column.id)
            .then(this._handleSuccessRemoveColumn.bind(this))
    }

    _handleSuccessRemoveColumn() {
        // dispatch in src/components/columns/index.js
        this.dispatchEvent(new Event('onSuccess'));
    }

    _editColumn () {
        this.$titleInput.value = this._column.title;
        this._toggleEditColumn();
    }

    _toggleEditColumn () {
        this.$title.classList.toggle('hidden');
        this.$submitEditColumn.classList.toggle('hidden');
        this.$titleInput.classList.toggle('hidden');
    }

    _submitEditColumn() {
        let payload = {
            columnId: this._column.id,
            column: {
                title: this.$titleInput.value.trim().toLowerCase()
            }
        }

        editColumn(payload)
            .then(this._handleEditColumnSuccess.bind(this))
            .catch(this._handleEditColumnError.bind(this))

    }

    _handleEditColumnSuccess (response) {
        this._column.title = response.title;
        this.$title.innerHTML = response.title;
        this._toggleEditColumn();
    }

    _handleEditColumnError (err) {
        if (err instanceof EmptyFieldsException) {
            let { errors } = err
            this.$titleInput.error = errors.title;
        }
    }
}

customElements.define('trello-column', TrelloColumn);