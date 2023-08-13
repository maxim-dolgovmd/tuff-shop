import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserSignUpForm from "./UserSignUpForm";

import { setShowForm} from "../../redax/slices/userSlice";

import styled from "../../styles/User.module.css";
import UserLoginForm from "./UserLoginForm";

const UserForm = () => {

    const dispatch = useDispatch()
    const {showForm, formType} = useSelector((state) => state.cart)

    const activeModal = () => {
        if (showForm) {
          dispatch(setShowForm(false))
        }
      }
    console.log(formType)

    return showForm && 
        <div className={styled.overlay} onClick={activeModal}>
            {
                formType === 'signup' ? <UserSignUpForm /> : <UserLoginForm />
            }
        </div> 
}

export default UserForm