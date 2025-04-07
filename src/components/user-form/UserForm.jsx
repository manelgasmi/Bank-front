import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/userService";
import "./userForm.scss";
import { setUser } from "../../redux/userSlice";
const UserForm = ({ handleEditUser }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const onSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updateResult = await userService.updateProfile(token, {
        firstName: firstName,
        lastName: lastName,
      });
      const updatedUser = updateResult.data.body;
      dispatch(setUser({
        token: token,
        user: updatedUser,
      }));
      handleEditUser();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCancel = async (e) => {
    e.preventDefault();
    handleEditUser();
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, []);

  return (
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
