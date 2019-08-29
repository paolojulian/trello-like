const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block
        }
        input {
            border: 0;
            box-sizing: border-box;
            outline: none;
            padding: 0.5rem;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.15);
            margin: 0.5rem 0;
            width: 100%;
        }
        .form-input {
            width: 100%;
        }
    </style>

    <div class="form-group">
        <div class="form-input">
            <input
                type="text"
                name=""
                value=""
                placeholder=""
            />
        </div>
        <div class="form-description">
            <slot name="description"></slot>
        </div>
        <div class="form-error">
            <slot name="error"></slot>
        </div>
    </div>
`

class FormGroup extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this.shadowRoot.querySelector('input');
    }

    connectedCallback() {
        this.$input.addEventListener('change', this._handleChange.bind(this));
    }
    disconnectedCallback() {
        this.$input.removeEventListener('change', this._handleChange.bind(this));
    }


    _handleChange(event) {
        this.setAttribute('value', event.target.value);
    }

    get value () {
        return this.$input.getAttribute('value');
    }

    set value (val) {
        this.$input.setAttribute('value', val);
    }

    static get observedAttributes () {
        return ['value', 'name', 'placeholder'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, newValue);
        if (oldValue === newValue) return;

        this.$input.setAttribute(name, newValue)
    }

}

customElements.define('form-group', FormGroup);