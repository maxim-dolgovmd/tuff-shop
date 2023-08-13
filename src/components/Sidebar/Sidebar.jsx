import React from "react"
import { useDispatch, useSelector } from "react-redux";

import styled from "../../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const listCategories = useSelector((state) => state.categories.categories)
    console.log(listCategories)
    const list = listCategories.slice(0, 5)
    console.log(list)

    return (
        <section className={styled.sidebar}>
            <div className={styled.title}>
                CATEGORIES
            </div>
            <nav>
                <ul className={styled.menu}>
                    {
                        list.map((obj) => {
                            return (
                                <li key={obj.id}>
                                    <NavLink 
                                        className={
                                            ({isActive}) => `${styled.link} ${isActive ? styled.active : ''}`
                                        }
                                        to={`/categories/${obj?.id}`}
                                    >
                                        {obj?.name}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <div className={styled.footer}>
                <a 
                    href="/help" 
                    className={styled.link} 
                    target="_blank"
                >
                    Help
                </a>

                <a 
                    href="/conditions" 
                    className={styled.link} 
                    target="_blank"
                    style={{textDecoration: 'underline'}}
                >
                    Terms & Conditions
                </a>
            </div>
        </section>
    )
}

export default Sidebar