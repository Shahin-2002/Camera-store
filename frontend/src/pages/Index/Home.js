import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Poster from '../../Components/Poster/Poster'
import LastCourses from '../../Components/LastCourses/LastCourses'
import RecomendBox from '../../Components/RecomendBox/RecomendBox'
import Device from '../../Components/Device/Device'
import Footer from '../../Components/Footer/Footer'

export default function Home() {
  return (
    <>
        <Navbar/>
        <Poster/>
        <LastCourses title={"آخرین دوربین ها"}/>
        <Device title={"دستگاه ها"}/>
        <RecomendBox title={"بسته های پیشنهادی"}/>
        <Footer/>
    </>
  )
}
