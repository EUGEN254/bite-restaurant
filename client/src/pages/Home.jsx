import React from 'react'
import Header from '../components/Header'
import PopularDishes from '../components/PopularDishes'
import AboutUs from '../components/AboutUs'
import PlannDinner from '../components/PlannDinner'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
        <Header/>
        <PopularDishes/>
        <AboutUs/>
        <PlannDinner/>
        <Testimonials/>
    </div>
  )
}

export default Home