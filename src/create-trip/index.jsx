import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { GenerateTripFromAI } from '@/service/AIModal';


function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {



    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return;
    }

    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details");
      return;
    }

    if (Number(formData.noOfDays) > 5) {
      toast("Max 5 days allowed");
      return;
    }
    setLoading(true);
    toast('Please wait... We are working on it...')
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)
    const result = await GenerateTripFromAI(FINAL_PROMPT);


    console.log(result);
    setLoading(false);
    SaveAiTrip(result)
  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId
      });

      navigate('/view-trip/' + docId);

    } catch (error) {
      console.error("SAVE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 min-h-screen bg-[#0f172a] text-white pt-24 pb-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel style</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just share a few details, and our AI will create a personalized itinerary tailored to you.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where do you want to go?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
              styles: {
                control: b => ({ ...b, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: 'white' }),
                input: b => ({ ...b, color: 'white' }),
                singleValue: b => ({ ...b, color: 'white' }),
                placeholder: b => ({ ...b, color: '#9ca3af' }),
                menu: b => ({ ...b, backgroundColor: '#1f242b' }),
                menuList: b => ({ ...b, backgroundColor: '#1f242b' }),
                option: (b, s) => ({ ...b, backgroundColor: s.isFocused ? '#5b708c' : '#1f242b', color: 'white' })
              }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 text-gray-850 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'How many days?'} type="number"
            className="bg-white/10 border border-white/20 
                    text-white placeholder:text-gray-400
                      rounded-lg p-3 w-full
                    focus:border-[#4c75e6] focus:ring-1 focus:ring-[#4c75e6]"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer 
              rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && 'shadow-lg border-[#4c75e6] border-2'}
              `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg
               hover:shadow-lg
               ${formData?.traveler == item.people && 'shadow-lg border-[#4c75e6] border-2'}
               `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="rounded-full px-8 py-6 bg-[#4c75e6] hover:bg-[#3b5fd1] text-white font-semibold shadow-lg">
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button

                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">

                <FcGoogle className='h-7 w-7' />
                Sign In With Google

              </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip