import React, { Component } from "react";
import "./style.scss";

class Note extends Component {
  constructor(props) {
    super(props);
    this.INDENT_SPACE = "    ";
  }

  addTabIndent = event => {
    if (event.keyCode === 9) {
      event.preventDefault();

      let start = event.target.selectionStart;
      let end = event.target.selectionEnd;
      let previousContent = this.props.content;
      let newContent =
        previousContent.substring(0, start) +
        this.INDENT_SPACE +
        previousContent.substring(end);

      event.target.selectionStart = event.target.selectionEnd = start + 1;

      this.updateNote(newContent);
    }
  };

  replaceElements = content => {
    content = content.replace("->", "\u2192");
    content = content.replace("<-", "\u2190");
    content = content.replace("\n--", "\n\u2022 ");
    content = content.replace("\\*(.*?)\\*", "");
    return content;
  };

  handleChange = event => {
    let value = this.replaceElements(event.target.value);
    this.updateNote(value);
  };

  updateNote = content => {
    this.props.handleChange(content);
  };

  render() {
    return (
      <textarea
        ref={c => (this._textarea = c)}
        placeholder={this.props.placeholderMessage}
        autoFocus={true}
        className="note"
        disabled={this.props.isDisabled}
        value={this.props.content}
        onKeyDown={this.addTabIndent}
        onChange={this.handleChange}
      />
    );
  }
}

export default Note;
