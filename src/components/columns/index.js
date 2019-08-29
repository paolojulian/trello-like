import { fetchColumns, fetchCards } from "../../../api/api";
import './column'
import './column-form'
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>

    <button
        class="add-column"
        type="button"
    >
        Add
    </button>

    <div class="column-list clear">
    </div>
`

class TrelloColumnList extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$columnList = this._shadowRoot.querySelector('.column-list');

        this.$columnForm = this._shadowRoot.querySelector('trello-column-form');

        this.$addColumnBtn = this._shadowRoot.querySelector('button.add-column');
    }

    connectedCallback() {
        this._renderColumnList();

        this.$addColumnBtn.addEventListener('click', this._addColumnForm.bind(this));
    }

    disconnectedCallback() {
        this.$addColumnBtn.removeEventListener('click');
    }

    async _renderColumnList () {
        await this._fetchCardsAndColumns()
        this.$columnList.innerHTML = '';
        this._columns.forEach(this._renderColumn.bind(this));
    }

    async _fetchCardsAndColumns() {
        try {
            let [ columns, cards ]  = await Promise.all([
                fetchColumns(),
                fetchCards()
            ]);

            // Filter each card into its columns
            for (let i = 0, l = columns.length; i < l; i ++) {
                const column = columns[i];
                columns[i].cards = cards.filter(card => Number(card.columnId) === Number(column.id));
            }

            this._columns = columns;

        } catch (err) {

            console.error(err);

        }
    }

    // Open the template from src/components/column-form.js
    _addColumnForm () {
        let $columnForm = document.createElement('trello-column-form');
        $columnForm.addEventListener('onSuccess', this._renderColumnList.bind(this));
        this._shadowRoot.appendChild($columnForm);
    }

    _pushColumn (column) {
        this._columns.push({
            ...column,
            cards: []
        })
    }

    _renderColumn (column) {
        let $columnItem = document.createElement('trello-column');
        $columnItem.column = column;
        $columnItem.addEventListener('onSuccess', this._renderColumnList.bind(this));
        this.$columnList.appendChild($columnItem);
    }

}

customElements.define('trello-column-list', TrelloColumnList);