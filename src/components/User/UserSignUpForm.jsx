import React, { useState } from "react";

import styled from "../../styles/User.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setShowForm, setFormType} from "../../redax/slices/userSlice";
import { useForm } from "react-hook-form";
import { useCreateUsersMutation } from "../../api/usersApi";

const UserSignUpForm = () => {

  const [CreateUser, {data: newUser}] = useCreateUsersMutation()
  const {register, handleSubmit,  formState: {errors}} = useForm({mode: 'onBlur'})

  const dispatch = useDispatch();

  const OnSubmit = handleSubmit((data) => {
    console.log(data)
    CreateUser(data)
    dispatch(setShowForm(false))
  })

  console.log(newUser)

  const {showForm} = useSelector((state) => state.cart)

  console.log(errors.email)

  return (
      <div className={styled.wrapper} onClick={(e) => e.stopPropagation()}>
        <div
          className={styled.close}
          onClick={() => dispatch(setShowForm(false))}
        >
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
          </svg>
        </div>

        <div className={styled.title}>Sign Up</div>

        <form className={styled.form}>
          <div className={styled.group} style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              autoComplete="off"
              {
                ...register('email', {
                  required: 'Введите свой email',
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/,
                    message: 'Некорректный email',
                  }
                })
              }
            />
            {
              errors.email && 
                <div style={{color: 'red'}}>
                  {errors.email?.message}
                </div>
            }
          </div>

          <div className={styled.group} style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <input
              type="name"
              placeholder="Your name"
              name="name"
              autoComplete="off"
              {
                ...register('name', {
                  required: 'Введите свое имя'
                })
              }
            />
            {
              errors.name && 
                <div style={{color: 'red'}}>
                  {errors.name?.message}
                </div>
            }
          </div>

          <div className={styled.group} style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              autoComplete="off"
              {
                ...register('password', {
                  required: 'Введите свой пароль',
                  minLength: {
                    value: 8,
                    message: 'Пароль не менее 8 символов'
                  }
                })
              }
            />
            {
              errors.password && 
                <div style={{color: 'red'}}>
                  {errors.password?.message}
                </div>
            }
          </div>

          <div className={styled.group} style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              autoComplete="off"
              {
                ...register('avatar')
              }
            />
          </div>

          <div className={styled.link} onClick={() => dispatch(setFormType('log in'))}> I already have an account</div>

          <button type="submit" className={styled.submit} onClick={OnSubmit}>
            Create in account
          </button>
        </form>
      </div>
  );
};

export default UserSignUpForm;
