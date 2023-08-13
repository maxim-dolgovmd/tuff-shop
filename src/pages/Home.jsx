import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from '../components/Poster/Poster'
import Products from "../components/Products/Products";
import Categories from "../components/Categories/Categories";
import Banner from "../components/Banner/Banner";
import { setFiltered } from "../redax/slices/productsSlice";

const Home = () => {

    const dispatch = useDispatch()
    const {products, filtered} = useSelector((state) => state.products)
    const {categories} = useSelector((state) => state.categories)
    
    React.useEffect(() => {
        if (!products.length) return

        dispatch(setFiltered(100))
    }, [products])

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Poster />
            <Products 
                products={products} 
                amount={5}
                title={'Trending'}
            />
            <Categories 
                categories={categories} 
                amount={5}
                title={'Worth seeing'}
            />
            <Banner />
            <Products 
                products={filtered} 
                amount={5}
                title={'Trending'}
            />
        </div>
    )
}

export default Home