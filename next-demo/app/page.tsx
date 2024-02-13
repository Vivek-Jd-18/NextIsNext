import React from 'react'
import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className='head_text text-center'>Next</h1>
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>Starter Demo</span>
        <p className='desc text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem modi quo cum quos pariatur omnis temporibus voluptatem facere excepturi debitis cupiditate facilis ipsa aliquam totam eveniet, tempore tenetur, nam necessitatibus!</p>
        <Feed />
    </section>
  )
}

export default Home