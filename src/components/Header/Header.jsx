import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "../../styles/Header.module.css";
import styledOverlay from "../../styles/User.module.css";
import Home from "../../pages/Home";

import Logo from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

import { useSearchProductsQuery } from "../../api/productsApi";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowForm, setFormType, setAuthUser } from "../../redax/slices/userSlice";

const IMAGES = [
  'https://p4.wallpaperbetter.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg',
  'https://s9.travelask.ru/system/images/files/000/336/892/wysiwyg_jpg/10452canada-landscape-map-wallpaper-3.jpg?1502197579',
  'https://img3.akspic.ru/attachments/crops/8/2/7/1/41728/41728-dzhasper-dikaya_mestnost-ozero-otrazhenie-utro-750x1334.jpg',
  'https://c.wallhere.com/photos/fe/57/1366x714_px_Abstract_Field_Abstract_Mountain_Nature_Wallpaper_Image_cool_hs_photos_field_photos_hd_images_for_desktop_hd_wallpapers_landscapes-801703.jpg!d'
]


const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {addItemToCart, authUser} = useSelector((state) => state.cart)

  const [searchValue, setSearchValue] = useState('')
  const {data, isLoading} = useSearchProductsQuery({title: searchValue})

  console.log(data)
  const [values, setValues] = React.useState({avatar: AVATAR, name: 'Guest'})

  console.log(authUser)
  React.useEffect(() => {
    if (Object.values(authUser).length) {
      setValues({avatar: 'https://cs14.pikabu.ru/post_img/2022/12/09/8/1670593011118812174.jpg', name: authUser?.name})
    }
    return
  }, [authUser, setAuthUser])

  console.log(Boolean(authUser.length))

  const handleClick = () => {
    if (!Object.values(authUser).length) {
      dispatch(setShowForm(true))
      dispatch(setFormType('signup'))
    } else {
      navigate('/profile')
    }
  }

  console.log(values)

  return (
    <div className={styled.header}>
      <div className={styled.logo}>
        <Link to="/">
          <img src={Logo} alt="STUF" />
        </Link>
      </div>
      <div className={styled.info}>
        <div 
          className={styled.user} 
          style={{cursor: 'pointer'}}
          onClick={handleClick}
        >
          <div
            className={styled.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styled.username}>{values?.name}</div>
        </div>
        <form className={styled.form}>
          <div className={styled.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styled.input}>
            <input
              name="search"
              placeholder="Search for anything..."
              type="search"
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {searchValue && 
              <div className={styled.box}>
                {isLoading ? 'Loading' : !data.length ? 'no results' : (
                  data.map(({title, id}) => {
                    return (
                      <Link 
                        key={id}
                        onClick={() => setSearchValue('')}
                        className={styled.item}
                        to={`products/${id}`}
                      >
                        <div 
                          className={styled.image}
                          style={{backgroundImage: `url(${IMAGES[0]})`}}
                        />
                        <div className={styled.title}>
                          {title}
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
          }
        </form>

        <div className={styled.account}>
            <Link to='/' className={styled.favourites}>
                <svg className={styled['icon-fav']}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                </svg>
            </Link>

            <Link to='/cart' className={styled.cart}>
                <svg className={styled['icon-cart']}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                </svg>
                <span className={styled.count}>
                  {
                    addItemToCart.length ? addItemToCart.length : 0
                  } 
                </span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
