import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(place?.placeImageUrl || '/placehold.jpg');

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: `${place?.placeName || ''} ${place?.placeAddress || ''}`,
      };

      const resp = await GetPlaceDetails(data);

      const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(place?.placeImageUrl || '/placehold.jpg');
      }
    } catch (error) {
      console.error('PLACE PHOTO ERROR:', error);
      setPhotoUrl(place?.placeImageUrl || '/placehold.jpg');
    }
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(`${place?.placeName || ''} ${place?.placeAddress || ''}`)
      }
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl}
          className="w-[130px] h-[130px] rounded-xl object-cover"
          alt={place?.placeName || 'place'}
          onError={(e) => {
            e.currentTarget.src = '/placehold.jpg';
          }}
        />

        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <h2 className="mt-2">🕙 {place?.timeToTravel}</h2>
          <h2 className="mt-2">🎟️ {place?.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;