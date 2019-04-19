import { Component, html } from "./component";
import { htmTransform } from './htmTransform'

const initialCode = `<div>{variable}</div>`

function sourceTypeRadio(type, currentType, handler) {
  return html`
    <input type="radio" name=${type} .checked=${currentType === type} @change=${handler}>
  `
}

class MainView extends Component {
  static get properties() {
    return {
      outputCode: {type: String},
      transformError: {type: Object},
      sourceType: {type: String}
    }
  }

  constructor() {
    super()
    this.sourceType = 'jsx'
  }

  firstUpdated() {
    this.inputCodeEditor = this.querySelector('.left-pane code-editor')
    this.inputCodeEditor.content = initialCode
  }

  inputEditorChange(e) {    
    const content = e.target.content
    this.transformCode(content);    
  }
  
  sourceTypeChange(e) {
    if (e.target.checked) {
      this.sourceType = e.target.name
      this.transformCode(this.inputCodeEditor.content)
    }
  }

  transformCode(content) {
    try {
      this.outputCode = htmTransform(content, { sourceType: this.sourceType });
      this.transformError = null;
    }
    catch (error) {
      this.outputCode = '';
      this.transformError = error;
    }
  }

  render() {
    return html`
      <section class="content application__content">        
        <div class="left-pane">
          <div class="source-type-selector">
          ${sourceTypeRadio('jsx', this.sourceType, this.sourceTypeChange)} JSX ${sourceTypeRadio('handlebars', this.sourceType, this.sourceTypeChange)} Handlebars
          </div>          
          ${this.transformError && html`<div class="transform-error">${this.transformError}</div>`}
          <code-editor @content-change=${this.inputEditorChange}></code-editor>
        </div>
        <div class="right-pane">
          <code-editor .content=${this.outputCode}></code-editor>
        </div>                
      </section>
    `
  }
}

customElements.define('main-view', MainView)