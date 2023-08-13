import React from "react";
import Poster from "../Poster/Poster";
import Category from "./Category";

const Singlecategories = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Poster />
            <Category/>   
        </div>
    )
}

export default Singlecategories