import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setRelated } from "../../redax/slices/productsSlice";

import { useNavigate, useParams, useRoutes } from "react-router-dom";

import { useGetProductQuery } from "../../api/productsApi";

import Sneakers from '../../images/image.svg'
import ProductInfo from "./ProductInfo";
import Products from "./Products";

const SingleProduct = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {data, isLoading, isError} = useGetProductQuery(id)
    const {products, related} = useSelector((state) => state.products)

    console.log(data)

    React.useEffect(() => {
        if (isLoading || !related.length) return

        if (isError) {
            navigate('/')
        }
    }, [isLoading, isError])

    React.useEffect(() => {
        if (data) {
            dispatch(setRelated(data.category.id))
        }
    }, [data, products])

    console.log(data)

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <ProductInfo {...data}/>
            <Products products={related} amount={5} title={'Related products'}/>
        </div>
    )
}

export default SingleProduct