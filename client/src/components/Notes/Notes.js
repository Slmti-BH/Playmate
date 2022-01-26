import React, { Component } from "react";
import Picker from "emoji-picker-react";
import "./Notes.scss";

class Notes extends Component {
  class = {
    text: "",
    showPicker: false,
  };
  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    });
  };
  handleShowPicker = (e) => {
    if (this.state.showPicker) {
      this.setState({
        showPicker: false,
      });
    } else {
      this.setState({
        showPicker: true,
      });
    }
  };

  handleModalClassName = () => {
    if (this.props.showModal) {
      return "modal active-modal";
    } else {
      return "modal not-active-modal";
    }
  };
  onEmojiClick = (e, emojiObject) => {};
  render() {
    console.log(this.props);

    return this.props.showModal ? (
      <div className="notes-modal-container">
        <div className="notes-modal-forms-container">
          <form
            className="notes-modal-form"
            action=""
            onSubmit={this.props.handleNotesSubmit}
          >
            <textarea
              className="notes-modal-text"
              name="notesInput"
              id=""
              cols="30"
              rows="10"
              placeholder="Type your note..."
            ></textarea>
            <button className="notes-modal-submit-btn" type="submit">
              + Add
            </button>
          </form>
          <button
            className="notes-modal-close-btn"
            type="button"
            onClick={this.props.handleHideModal}
          >
            x
          </button>
          {this.props.children}
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default Notes;
