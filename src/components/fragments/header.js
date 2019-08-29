const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            position: relative;
            width: 100%;
            height: 50px;
            background-color: #2D9CDB;
            color: #FAFAFA;
        }
        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            letter-spacing: 5px;
            text-transform: uppercase;
            font-weight: 200;
            font-size: 1.5rem;
        }
    </style>

    <header>
        <div class="title">TREYLO</div>
    </header>
`

class MyHeader extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('my-header', MyHeader);