import React, { Component } from "react";
import "./ProfileInfo.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import EditNameModal from "../EditNameModal/EditNameModal";
import EditNumberOfChildrenModal from "../EditNumberOfChildrenModal/EditNumberOfChildrenModal";
import EditAgeGroupModal from "../EditAgeGroupModal/EditAgeGroupModal";
import axios from "axios";

class ProfileInfo extends Component {
  state = {
    showEditName: false,
    showEditAgeGroup: false,
    showEditNumberOfChildren: false,
  };

  // to hide modals
  hideEditNameModal = () => {
    this.setState({
      showEditName: false,
    });
  };

  hideEditAgeGroup = () => {
    this.setState({
      showEditAgeGroup: false,
    });
  };

  hideEditNumberOfChildren = () => {
    this.setState({
      showEditNumberOfChildren: false,
    });
  };

  // to show modals
  displayEditName = () => {
    this.setState({
      showEditName: true,
    });
  };

  displayEditAgeGroup = () => {
    this.setState({
      showEditAgeGroup: true,
    });
  };

  displayEditNumberOfChildren = () => {
    this.setState({
      showEditNumberOfChildren: true,
    });
  };

  // edit forms submits
  editNameSubmit=(e)=>{
    editIcon.preventDefault();
    const nameInput=e.target.nameInput.value;

    nameInput
      ? axios
          .put(
            `http://localhost:8080/auth/${this.props.userInfo.username}/editname`,
            {
              name: nameInput,
            }
          )
          .then((res) => {
            console.log(res);
            e.target.reset();
            this.setState({
              showEditName: false,
            });
          })
          .catch((err) => console.log(err))
      : alert("Please type your name.");
  }

  render() {
    console.log(this.props.userInfo);
    const { numberOfChildren, name, childrenAgeGroup } = this.props.userInfo;
    return this.props.showState ? (
      <div className="profile-info-page-container">
        <div className="profile-info-page-container__input">
          <p className="profile-info-page-container__text">Name:{name}</p>
          <img src={editIcon} alt="Edit icon." onClick={this.displayEditName} />
        </div>
        <EditNameModal
          handleShowEditName={this.state.showEditName}
          handleHideEditName={this.hideEditNameModal}
          handleEditNameSubmit={this.editNameSubmit}
        />
        <div className="profile-info-page-container__input">
          <p className="profile-info-page-container__text">
            Number of children: {numberOfChildren}{" "}
          </p>
          <img src={editIcon} alt="Edit icon." />
        </div>
        <EditNumberOfChildrenModal
          handleHideEditNumberOfChildren={this.hideEditNumberOfChildren}
          handleShowEditNumberOfChildren={this.state.showEditNumberOfChildren}
        />
        <div className="profile-info-page-container__input">
          <p className="profile-info-page-container__text">
            Children Age group: {childrenAgeGroup}
          </p>
          <img src={editIcon} alt="Edit icon." />
        </div>
        <EditAgeGroupModal
          handleHideEditAgeGroup={this.hideEditAgeGroup}
          handleShowEditNumberOfChildren={this.state.showEditAgeGroup}
        />
        <button
          className="profile-info-page-container__btn"
          onClick={this.props.hideModal}
        >
          X
        </button>
      </div>
    ) : (
      ""
    );
  }
}

export default ProfileInfo;
