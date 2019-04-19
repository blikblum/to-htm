import _ from 'underscore'
import { Component, html } from "./component";
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

let editorCount = 0

export class CodeEditor extends Component {
  static get properties () {
    return {
      content: {type: String},
      theme: {type: String},
      mode: {type: String},
      delay: {type: Number}    
    }
  } 

  constructor () {
    super()
    this.editorId = editorCount++
    this.mode = 'javascript'
    this.theme = 'monokai'
    this.delay = 500
  }

  get content () {
    return this.editor ? this.editor.getSession().getValue() : ''
  }

  set content (value) {
    if (this.__content === value) {
      return
    }
    this.__content = value    
    if (this.editor) {
      this.editor.getSession().setValue(value)
    }
  }    

  getEditorSelector() {
    return `ace-editor-${this.editorId}`
  }

  firstUpdated () {
    this.editor = ace.edit(this.getEditorSelector())
    this.editor.setTheme(`ace/theme/${this.theme}`);
    this.editor.setShowPrintMargin(false)
    const session = this.editor.getSession()
    session.setUseWrapMode(true)
    session.setMode(`ace/mode/${this.mode}`)
    session.on('change', _.debounce(() => {
      const event = new CustomEvent('content-change', {
        bubbles: true
      })
      this.dispatchEvent(event)
    }, this.delay))
    session.setValue(this.__content || '')
  }

  render() {
    return html`      
      <div class="editor" id=${this.getEditorSelector()}></div>
    `    
  } 
}

customElements.define('code-editor', CodeEditor)