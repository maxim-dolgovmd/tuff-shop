import React, { useState } from "react";

import styled from "../../styles/Cart.module.css";

import { useSelector, useDispatch } from "react-redux";

import {setDeleteProduct, setAddItemToCart } from "../../redax/slices/userSlice";

const Cart = () => {

    const dispatch = useDispatch()

    const {addItemToCart} = useSelector((state) => state.cart)

    console.log(addItemToCart)

    const priceCount = addItemToCart.reduce((acc, item) => {
        return acc + (item?.quantity * item?.price)
    }, 0)

    const changeQuantity = (item, quantity) => {
        dispatch(setAddItemToCart({...item, quantity}))
    }

    const deleteProduct = (index) => {
        dispatch(setDeleteProduct(index))
    }

    return (
        <section className={styled.cart}>
            <h2 className={styled.title}>Your cart</h2>

            {
                !addItemToCart.length ? (
                    <div className={styled.empty}>Here is empty</div> 
                ) : (
                    <>
                        <div className={styled.list}>
                            {
                                addItemToCart.map((item, index) => {

                                    const {id, title, category, quantity, sizes, price, images} = item

                                    console.log(item)

                                    return (
                                        <div 
                                            className={styled.item}
                                            key={id}
                                        >
                                            <div 
                                                className={styled.image}
                                                style={{backgroundImage: `url(${images[0]})`}}
                                            />

                                            <div className={styled.info}>
                                                <div className={styled.name}>{`${title} (${sizes})`}</div>
                                                <div className={styled.category}>{category?.name}</div>
                                            </div>

                                            <div className={styled.price}>{price}$</div>

                                            <div className={styled.quantity}>

                                                <div className={styled.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))} >
                                                    <svg className="icon">
                                                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}/>
                                                    </svg>
                                                </div>

                                                <span>{quantity}</span>

                                                <div className={styled.plus} onClick={() => changeQuantity(item, quantity + 1)}>
                                                    <svg className="icon">
                                                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}/>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className={styled.total}>{price * quantity}$</div>

                                            <div className={styled.close} onClick={() => deleteProduct(index)}>
                                                <svg className="icon">
                                                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <section className={styled.actions}>
                            <div className={styled.total}>
                                TOTAL PRICE: {' '}
                                <span>{priceCount}$</span>
                            </div>

                            <button className={styled.proceed}>
                                Proceed to checkout
                            </button>
                        </section>
                    </>
                )
            }
        </section>
    )
}

export default Cart