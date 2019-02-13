import React, { Component } from "react";
import Content from "./Content";
import "./style.scss";

class Note extends Component {
  constructor(props) {
    super(props);
    this.INDENT_SPACE = "    ";
    this.textareaRef = React.createRef();

    this.state = {
      textareaHeight: ""
    };
  }

  componentDidMount() {
    this.setState({ textareaHeight: this.textareaRef.scrollHeight + "px" });
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
    this.setState({ textareaHeight: Number(event.target.scrollHeight) + "px" });
    this.updateNote(value);
  };

  updateNote = content => {
    this.props.handleChange(content);
  };

  render() {
    const { content, isDisabled, placeholderMessage } = this.props;

    const { textareaHeight } = this.state;
    const textareaStyle = { height: textareaHeight };
    const textareaRender = !isDisabled && (
      <textarea
        ref={this.textareaRef}
        placeholder={placeholderMessage}
        autoFocus={true}
        className="note"
        style={textareaStyle}
        disabled={isDisabled}
        value={content}
        onKeyDown={this.addTabIndent}
        onChange={this.handleChange}
      />
    );

    const contentRender = isDisabled && <Content content={content} />;

    return (
      <div className="container">
        {textareaRender}
        {contentRender}
      </div>
    );
  }
}

export default Note;
