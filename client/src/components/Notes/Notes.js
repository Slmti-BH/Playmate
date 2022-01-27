import React from "react";
import "./Notes.scss";

function Notes(props) {
  return props.showModal ? (
    <div className="notes-modal-container">
      <div className="notes-modal-forms-container">
        <form
          className="notes-modal-form"
          action=""
          onSubmit={props.handleNotesSubmit}
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
          onClick={props.handleHideModal}
        >
          x
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Notes;
