import React from 'react'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Devotional from '../home/Devotional'

const Home = () => {
  return (
    <div className='text-white'>
      <Hero />
      <Trending />
      <Devotional />
    </div>
  )
}

export default Home
