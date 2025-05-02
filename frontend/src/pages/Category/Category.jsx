import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './Category.css'
import { CgArrowsVAlt } from "react-icons/cg";
export default function Category() {
  return (
    <>
    <Navbar/>
        <div className='container'>
            <div className='main-category'>
                <div className='Configuring'>
                <CgArrowsVAlt />
                <span> مرتب سازی بر اساس :</span>
                <span>ارزان ترین</span>
                <span>گران ترین</span>
                </div>

                <div className='all-category-products'>

                </div>
            </div>
        </div>
    <Footer/>
    </>
  )
}
