const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block
        }
        textarea {
            border: 0;
            box-sizing: border-box;
            outline: none;
            padding: 0.5rem;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.15);
            margin: 0.5rem 0;
            width: 100%;
            resize: none;
        }
        .is-invalid {
            border: 1px solid var(--my-red);
        }
        .form-textarea {
            width: 100%;
        }
        .form-error {
            color: var(--my-red);
            font-weight: 400;
            letter-spacing: 1px;
            font-size: 14px;
        }
    </style>

    <div class="form-group-textarea">
        <div class="form-textarea">
            <textarea
                class="input"
                rows="10"
                ></textarea>
        </div>
        <div class="form-description">
            <slot name="description"></slot>
        </div>
        <div class="form-error">
            <span></span>
        </div>
    </div>
`

class FormGroupTextArea extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this._shadowRoot.querySelector('.input');
        this.$error = this._shadowRoot.querySelector('.form-error span');
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

    set error (val) {
        if (val) {
            this.$input.classList.add('is-invalid');
            this.$error.innerHTML = val;
        } else {
            this.$input.classList.remove('is-invalid');
            this.$error.innerHTML = '';
        }
    }

    static get observedAttributes () {
        return ['value', 'placeholder'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue)
        switch(name){
            case "placeholder":
                this.$input.placeholder = newValue;
                break;
            default:
                this.$input.setAttribute(name, newValue)
                break;
        }
    }

}

customElements.define('form-group-textarea', FormGroupTextArea);