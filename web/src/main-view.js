import { Component, html } from "./component";
import { htmTransform } from './htmTransform'

const initialCode = `<div>{variable}</div>`

class MainView extends Component {
  static get properties() {
    return {
      outputCode: {type: String},
      transformError: {type: Object}
    }
  }

  render() {
    return html`
      <section class="content application__content">        
        <div class="left-pane">
          ${this.transformError && html`<div class="transform-error">${this.transformError}</div>`}
          <code-editor @content-change=${this.inputEditorChange}></code-editor>
        </div>
        <div class="right-pane">
          <code-editor .content=${this.outputCode}></code-editor>
        </div>                
      </section>
    `
  }

  firstUpdated() {
    this.querySelector('.left-pane code-editor').content = initialCode
  }

  inputEditorChange(e) {    
    const content = e.target.content
    try {
      this.outputCode = htmTransform(content)      
      this.transformError = null
    } catch (error) {
      this.outputCode = ''
      this.transformError = error      
    }    
  }
}

customElements.define('main-view', MainView)