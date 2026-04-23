import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      };

      const resp = await GetPlaceDetails(data);

      const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl('/placeholder.jpg');
      }

    } catch (error) {
      console.error("INFO PHOTO ERROR:", error);
      setPhotoUrl('/placeholder.jpg');
    }
  }

  return (
    <div>
      <img
        src={photoUrl}
        className='h-[340px] w-full object-cover rounded-xl'
        onError={(e) => e.currentTarget.src = '/placeholder.jpg'}
      />

      <div className='flex justify-between items-center'>
        <div className=' my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>
            {trip?.userSelection?.location?.label}
          </h2>

          <div className='hidden sm:flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
              🥂 No. Of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection;