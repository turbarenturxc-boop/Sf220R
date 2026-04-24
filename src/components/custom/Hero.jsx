import React, { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Globe from 'react-globe.gl'

function Hero() {
  const globeRef = useRef()

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().autoRotateSpeed = 0.6
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/9665177/pexels-photo-9665177.jpeg')] bg-cover bg-center"></div>

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-20 gap-8">

        <h1 className="text-[42px] md:text-[56px] font-extrabold text-center max-w-5xl">
          <span className="text-blue-500">
            Plan Your Dream Trip
          </span>{' '}
          with AI, Custom travel plans based on your style, time, and budget.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl">
          Your AI-powered travel assistant that takes your ideas, preferences, and budget and turns them into a complete, personalized trip plan you can follow with ease.
        </p>

        <Link to="/create-trip">
          <Button className="rounded-full px-6 py-3">
            Create my trip
          </Button>
        </Link>

        {/* 🌍 Globe */}
        <div className="relative z-10 flex justify-center items-center w-full overflow-hidden">
          <div className="w-[700px] h-[700px] flex justify-center items-center">
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              backgroundColor="rgba(0,0,0,0)"
              width={700}
              height={700}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero