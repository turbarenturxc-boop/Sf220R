import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/9665177/pexels-photo-9665177.jpeg')] bg-cover bg-center"></div>

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 gap-8">
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
      </div>
    </div>
  )
}

export default Hero