import { deleteCard } from '../../../../api/api';
import dragNDrop from '../../../utils/drag-n-drop';
import './card-modal';
import './card-edit';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        .fill {
            position: relative;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            margin: 1rem 0;
            cursor: pointer;
            overflow: hidden;
            transition: all 200ms ease-in-out;
            user-select: none;
        }
        .hold {
            border: solid #ccc 2px;
        }
        .invisible {
            display: none;
        }
        .fill:hover {
            background-color: #EEEEEE;
        }
        .fill:hover .header {
            background-color: var(--my-secondary);
            color: var(--my-font-white);
        }
        .header {
            padding: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            transition: all 200ms ease-in-out;
        }
        #title {
            text-transform: capitalize;
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
        .actions {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
        }
    </style>

    <div class="fill" draggable="true">
        <div class="header">
            <span id="title"></span>
            <div class="actions">
                <my-button
                    class="edit"
                    fab
                    fab-size="sm">
                    E
                </my-button>
                <my-button
                    class="delete"
                    backgroundColor="#EB5757"
                    fab
                    fab-size="sm">
                    X
                </my-button>
            </div>
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

        this.$card = this._shadowRoot.querySelector('.fill');
        this.$content = this._shadowRoot.querySelector('.content');

        this.$title = this._shadowRoot.querySelector('#title');
        this.$description = this._shadowRoot.querySelector('#description');
        this.$deleteBtn = this._shadowRoot.querySelector('.delete');
        this.$editBtn = this._shadowRoot.querySelector('.edit');
        
    }

    connectedCallback() {
        this.$card.addEventListener('dragstart', dragNDrop.dragStart);
        this.$card.addEventListener('dragend', dragNDrop.dragEnd);
        this.$deleteBtn.addEventListener('onClick', this._deleteCard.bind(this));
        this.$editBtn.addEventListener('onClick', this._editCard.bind(this));
        this.$content.addEventListener('click', this._viewCard.bind(this));
    }

    disconnectedCallback() {
        this.$card.removeEventListener('dragstart', dragNDrop.dragStart);
        this.$card.removeEventListener('dragend', dragNDrop.dragEnd);
        this.$deleteBtn.removeEventListener('click', this._deleteCard.bind(this));
        this.$editBtn.removeEventListener('onClick', this._editCard.bind(this));
        this.$content.removeEventListener('click', this._viewCard.bind(this));
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
     * TODO: no modals just extend card
     * 
     * Opens a modal to view details of the card
     */
    _viewCard () {
        let $cardModal = document.createElement('card-modal');
        $cardModal.title = this._card.title;
        $cardModal.description = this._card.description;
        this._shadowRoot.appendChild($cardModal);
    }

    /**
     * Opens a modal to edit the card
     */
    _editCard () {
        let $cardEdit = document.createElement('card-edit');
        $cardEdit.addEventListener('onSuccess', this._reloadCards.bind(this));
        this._shadowRoot.appendChild($cardEdit);
        $cardEdit.id = this._card.id;
        $cardEdit.title = this._card.title;
        $cardEdit.description = this._card.description;
        $cardEdit.columnId = this._card.columnId;
    }
}

customElements.define('trello-card', MyColumn);