import React, { useState } from "react";

import styled from "../../styles/Category.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useSearchProductsQuery } from "../../api/productsApi";
import Products from "../Products/Products";

const Category = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const {categories} = useSelector((state) => state.categories)

    const defaultValues = {
        title: '',
        price_min: 0,
        price_max: 0,
    }

    const defaultParams = {
        limit: 5,
        offset: 0,
        categoryId: id,
        ...defaultValues,
    }

    const [isEnd, setIsEnd] = React.useState(false)
    const [values, setValues] = React.useState(defaultValues)
    const [params, setParams] = React.useState(defaultParams)
    const [cat, setCat] = React.useState(null)
    // const [items, setItems] = React.useState([])

    const {data, isLoading} = useSearchProductsQuery(params)


    React.useEffect(() => {
        if (!id) return

        setValues(defaultValues)
        // setItems([])
        setIsEnd(false)

        setParams({...defaultParams, categoryId: id})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // React.useEffect(() => {
    //     if (isLoading) return

    //     console.log(data)
    //     if (!data.length) return setIsEnd(true)

    //     setItems([...data])
    // }, [data, isLoading])

    React.useEffect(() => {
        if (!id || !categories.length) return

        const category = categories.find((item) => item?.id === Number(id))

        if (!category?.name) navigate('/')
        
        setCat(category?.name)
    }, [categories, id])


    const handleButton = () => {
        setParams({...params, limit: 100})
        setIsEnd(true)
    }

    const handleChange = ({target: {name, value}}) => {
        setParams({...values, ...params, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // setItems([])
        setIsEnd(false)

        setParams({...defaultParams, ...values})
    }

    const handleReset = () => {
        setValues(defaultValues)
        setParams(defaultParams)
        setIsEnd(false)
    }

    console.log(data)

    return (
        <section className={styled.wrapper} style={{width: '1010px'}}>
            <h2 className={styled.title}>{cat}</h2>

            <form 
                className={styled.filters}
                style={{padding: '0 22px'}}
                onSubmit={handleSubmit}
            >
                <div className={styled.filter}>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Product name"
                        value={params.title}
                        onChange={handleChange}
                    />
                </div>

                <div className={styled.filter}>
                    <input 
                        type="number" 
                        name="price_min"
                        value={params.price_min}
                        onChange={handleChange}
                    />
                    <span>Price from</span>
                </div>

                <div className={styled.filter}>
                    <input 
                        type="number" 
                        name="price_max"
                        value={params.price_max}
                        onChange={handleChange}
                    />
                    <span>Price two</span>
                </div>

                <button type="submit" hidden/>
            </form>
            {
                isLoading ? (
                    <div className='preloader'>Loading...</div>
                ): !data.length ? 
                    <div className={styled.back}>
                        <span>No results</span>
                        <button onClick={handleReset}>Reset</button>
                    </div> : (
                        <Products products={data} amount={data.length} title=''/>
                    )
            }

            {
                !isEnd && 
                    <div className={styled.more} style={{margin: '0px'}}>
                        <button onClick={handleButton} >
                            See more
                        </button>
                    </div>
            }
        </section>
    )
}

export default Category