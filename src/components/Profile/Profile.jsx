import React from "react";

import styled from "../../styles/Profile.module.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { setShowForm, setAuthUser } from "../../redax/slices/userSlice";

import { useUpdateUserMutation } from "../../api/usersApi";

const Profile = () => {
  const dispatch = useDispatch();

  const [UpdateUser] = useUpdateUserMutation();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
  })


  const { authUser } = useSelector((state) => state.cart);
  console.log(authUser)


  React.useEffect(() => {
    const isNotEmpty = Object.values(authUser).every((val) => val);
    if (!isNotEmpty) return;

    setValues(authUser)
  }, [authUser])

  const handleChange = ({target: {name, value}}) => {
    setValues({...values, [name]: value})
  }



  const handleSubmit = (async (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    const {data} = await UpdateUser(values);
    console.log(data)
    dispatch(setAuthUser(data))
  });




  return (
    <section className={styled.profile}>
      {!Object.values(authUser).length ? (
        <span>You need to log in</span>
      ) : (
        <form className={styled.form} onSubmit={handleSubmit}>
          <div
            className={styled.group}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div
            className={styled.group}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <input
              type="name"
              placeholder="Your name"
              name="name"
              value={values.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div
            className={styled.group}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <input
            //   type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className={styled.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
