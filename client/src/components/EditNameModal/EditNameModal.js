import React from "react";

function EditNameModal(props) {
  console.log(props);

  return props.handleShowEditName ? (
    <div>
      <form onSubmit={props.handleEditNameSubmit}>
        <button onClick={props.handleHideEditName}>X</button>
        <input name="nameInput" type="text" placeholder="Type name..." />
        <button type="submit">Save</button>
      </form>
    </div>
  ) : (
    ""
  );
}

export default EditNameModal;
