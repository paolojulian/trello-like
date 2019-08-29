const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            width: 300px;
            border-radius: 10px;
            margin: 2rem 0;
        }
        .header {
            padding: 0.5rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            text-align: center;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .content {
            padding: 1rem;
            padding-bottom: 2rem;
        }
    </style>

    <div class="card">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
`

class MyCard extends HTMLElement {

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('my-card', MyCard);