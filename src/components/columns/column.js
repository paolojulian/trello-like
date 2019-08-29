import { deleteColumn, fetchCardsByColumn } from '../../../api/api';
import './card';
import './card/card-form';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
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
        .remove-column {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
        }
    </style>
    <div class="column">
        <div class="column-header">
            <h2 id="title"></h2>
            <span class="remove-column">
                <my-button
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
        this.$cardList = this._shadowRoot.querySelector('#cards');

        this.$addCard = this._shadowRoot.querySelector('.add-card my-button');
        this.$removeColumn = this._shadowRoot.querySelector('.remove-column my-button');
    }

    connectedCallback() {
        this.$addCard.addEventListener('onClick', this._addCard.bind(this));
        this.$removeColumn.addEventListener('onClick', this._removeColumn.bind(this));
    }

    disconnectedCallback() {
        this.$addCard.removeEventListener('click', this._addCard.bind(this));
        this.$removeColumn.removeEventListener('onClick', this._removeColumn.bind(this));
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
}

customElements.define('trello-column', TrelloColumn);