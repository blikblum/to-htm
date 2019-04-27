import { Component, html } from "./component";
import { htmTransform } from './htmTransform'

const initialCode = `<div>{variable}</div>`

function sourceTypeRadio(type, currentType, handler, label) {
  const id = `source-type-${type}`
  return html`
    <input type="radio" id=${id} name=${type} .checked=${currentType === type} @change=${handler}>
    <label for=${id}>${label}</label>
  `
}

class MainView extends Component {
  static get properties() {
    return {
      outputCode: {type: String},
      transformError: {type: Object},
      sourceType: {type: String},
      toJSX: {type: Boolean}
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
  
  toJSXChange(e) {    
      this.toJSX = e.target.checked
      this.transformCode(this.inputCodeEditor.content)
  }
    
  sourceTypeChange(e) {
    if (e.target.checked) {
      this.sourceType = e.target.name
      if (this.sourceType === 'jsx') {
        this.toJSX = false
      }
      this.transformCode(this.inputCodeEditor.content)
    }
  }

  transformCode(content) {
    try {
      this.outputCode = htmTransform(content, { sourceType: this.sourceType, toJSX: this.toJSX });
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
          <div class="code-options-bar">
            ${sourceTypeRadio('jsx', this.sourceType, this.sourceTypeChange, 'JSX')} 
            ${sourceTypeRadio('handlebars', this.sourceType, this.sourceTypeChange, 'Handlebars')}
          </div>          
          ${this.transformError && html`<div class="transform-error">${this.transformError}</div>`}
          <code-editor @content-change=${this.inputEditorChange}></code-editor>
        </div>
        <div class="right-pane">
          <div class="code-options-bar">
            <input type="checkbox" id="to-jsx" name="to-jsx" .checked=${this.toJSX} @change=${this.toJSXChange} ?disabled=${this.sourceType === 'jsx'}><label for="to-jsx">To JSX</label>
          </div>          
          <code-editor .content=${this.outputCode}></code-editor>
        </div>                
      </section>
    `
  }
}

customElements.define('main-view', MainView)