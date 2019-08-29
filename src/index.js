import './components/columns'
import './components/widgets/modal'
import './components/widgets/my-button'
import './components/widgets/my-card'
import './components/widgets/form-group'
import './components/widgets/form-group-textarea'
import './components/fragments/header'

require('./styles/app.css')
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: -apple-system, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
        :host /deep/ * {
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: 0;
        }
        main {
            --my-primary: rgba(45, 156, 219, 0.90);
            --my-secondary: #2D9CDB;
            --my-pink: #FFB3C3;
            --my-font-white: #ffffff;
            --my-font-black: rgba(0, 0, 0, 0.87);
            --my-font-black-secondary: rgba(0, 0, 0, 0.54);
            --my-red: #EB5757;
            --my-black: #131313;
            --my-green: #219653;
          
            --my-font-shadow-dark: 0px 0px 10px rgba(0, 0, 0, 0.25);
            --my-font-shadow-light: 0px 0px 10px rgba(0, 0, 0, 0.25);
        }
    </style>
    <my-header></my-header>

    <main>
        <trello-column-list></trello-column-list>
    </main>
`

class MyApp extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('my-app', MyApp);