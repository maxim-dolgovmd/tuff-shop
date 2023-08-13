import React from "react";

import styled from "../../styles/Categories.module.css";
import { Link } from "react-router-dom";

import Sneakers from '../../images/sneakers.svg'

const Categories = ({
    title,
    categories,
    amount,
}) => {
    const list = categories.filter((_, i) => i < amount)
    console.log(list)

    return (
        <section className={styled.section}>
            <h2>{title}</h2>
            <div className={styled.list}>
                {
                    list.map(({id, name}) => {
                        return (
                            <Link 
                                key={id}
                                to={`/categories/${id}`} 
                                className={styled.item}
                            >
                                <div className={styled.image} >
                                    <img src={Sneakers} alt="sneakers" />
                                </div>
                                <h3 className={styled.title}>
                                    {name}
                                </h3>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Categories