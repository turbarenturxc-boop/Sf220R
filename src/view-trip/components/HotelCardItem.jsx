import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

  const [photoUrl, setPhotoUrl] = useState(hotel?.hotelImageUrl || '/placeholder.jpg');

  useEffect(() => {
    if (hotel?.hotelName) {
      GetPlacePhoto();
    }
  }, [hotel])

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: `${hotel?.hotelName || ''} ${hotel?.hotelAddress || ''}`
      }

      const resp = await GetPlaceDetails(data);

      const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(hotel?.hotelImageUrl || '/placeholder.jpg');
      }

    } catch (error) {
      console.error("HOTEL PHOTO ERROR:", error);
      setPhotoUrl(hotel?.hotelImageUrl || '/placeholder.jpg');
    }
  }

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(`${hotel?.hotelName}, ${hotel?.hotelAddress}`)
      }
      target='_blank'
    >
      <div className='hover:scale-105 transition-all cursor-pointer'>
        <img
          src={photoUrl}
          className='rounded-xl h-[180px] w-full object-cover'
          alt={hotel?.hotelName}
          onError={(e) => e.currentTarget.src = '/placeholder.jpg'}
        />

        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotel?.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
          <h2 className='text-sm'>💰 {hotel?.price}</h2>
          <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem