import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/userService";
import "./userForm.scss";
import { setUser } from "../../redux/userSlice";

const UserForm = ({ handleEditUser }) => {
  const dispatch = useDispatch();

  // get token and user from store
  const { token, user } = useSelector((state) => state.user);

  // Local state to hold form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // saving the updated user profile
  const onSave = async (e) => {
    e.preventDefault();
    try {
      const updateResult = await userService.updateProfile(token, {
        firstName: firstName,
        lastName: lastName,
      });
      const updatedUser = updateResult.data.body;
      // update redux store with the new user
      dispatch(setUser({
        token: token,
        user: updatedUser,
      }));
      // call handleEditUser function from the parent (User.jsx) to exit edit form
      handleEditUser();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  // canceling the edit form
  const onCancel = async (e) => {
    e.preventDefault();
    handleEditUser();
  };
  // Populate the form fields with the current user data when the component mounts
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, []);

  return (
    // Render the form only if the user data is available
    user && (
      <section className="user-form-section">
        <form onSubmit={onSave}>
          <div className="input-wrapper">
            <input
              type="text"
              value={firstName}
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              placeholder="Lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="button-wrapper">
            <button type="submit" disabled={!user.firstName || !user.lastName}>
              Save
            </button>
            <button className="cancel" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    )
  );
};

export default UserForm;
