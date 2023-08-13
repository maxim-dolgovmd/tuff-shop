import React, { useState } from "react";

import styled from "../../styles/Product.module.css";

import Sneakers from '../../images/image.svg'
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setAddItemToCart, setAddItemToFavorites } from "../../redax/slices/userSlice";

const SIZES = [4, 4.5, 5]

const IMAGES = [
    'https://p4.wallpaperbetter.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg',
    'https://s9.travelask.ru/system/images/files/000/336/892/wysiwyg_jpg/10452canada-landscape-map-wallpaper-3.jpg?1502197579',
    'https://img3.akspic.ru/attachments/crops/8/2/7/1/41728/41728-dzhasper-dikaya_mestnost-ozero-otrazhenie-utro-750x1334.jpg',
    'https://c.wallhere.com/photos/fe/57/1366x714_px_Abstract_Field_Abstract_Mountain_Nature_Wallpaper_Image_cool_hs_photos_field_photos_hd_images_for_desktop_hd_wallpapers_landscapes-801703.jpg!d'
]

const ProductInfo = (props) => {

    const {title, price, description} = props

    const dispatch = useDispatch()

    const [currentImage, setCurrentImage] = useState()
    const [currentSize, setCurrentSize] = useState()

    React.useEffect(() => {
        setCurrentImage(IMAGES[0])
    }, [])

    console.log(currentImage)

    const {addItemToCart} = useSelector((state) => state.cart)

    console.log(addItemToCart)
    
    return (
        <section className={styled.product} >
            <div className={styled.images}>
                <div 
                    className={styled.current} 
                    style={{backgroundImage: `url(${currentImage})`}}
                />
                <div className={styled['images-list']}>
                    {
                        IMAGES?.map((image, index) => {
                            console.log(image)
                            return (
                                <div
                                    key={index} 
                                    className={styled.image}
                                    style={{backgroundImage: `url(${image})`}}
                                    onClick={() => setCurrentImage(image)}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className={styled.info} >
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <h1 className={styled.title}>{title}</h1>
                    <div className={styled.price}>{price} $</div>
                    <div className={styled.color}>
                        <span>Color:</span> Green
                    </div>
                    <div className={styled.sizes}>
                        <span>Sizes:</span>

                        <div className={styled.list}>
                            {
                                SIZES.map((size, index) => {
                                    return (
                                        <div 
                                            key={index}
                                            className={`${styled.size} ${currentSize === size && styled.active}`}
                                            onClick={() => setCurrentSize(size)}
                                        >
                                            {size}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <p className={styled.description}>{description}</p>
                    <div className={styled.actions} >
                        <button 
                            className={styled.add} 
                            disabled={!currentSize}
                            onClick={() => dispatch(setAddItemToCart({...props, sizes: currentSize}))}
                        >
                            Add to cart
                        </button>
                        <button 
                            className={styled.favourite}
                            onClick={() => dispatch(setAddItemToFavorites({...props, sizes: currentSize || SIZES[0]}))}
                        >
                            Add to favourites
                        </button>
                    </div>
                </div>

                <div className={styled.bottom}>
                    <div className={styled.purchase}>19 people purchased</div>

                    <Link to={'/'}>Return to store</Link>
                </div>
            </div>
        </section>
    )
}

export default ProductInfo