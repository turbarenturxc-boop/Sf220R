import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

const generationConfig = {
  temperature: 0,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "hotels": [
    {
      "hotelName": "The D Las Vegas",
      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
      "price": "$50-$100 per night",
      "hotelImageUrl": "https://www.theDcasino.com/images/hero/main-hero-02.jpg",
      "geoCoordinates": "36.1695, -115.1438",
      "rating": "3.5 stars",
      "description": "A budget-friendly hotel located in downtown Las Vegas with a retro vibe. It features a casino, a pool, and several dining options."
    },
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",
      "price": "$40-$80 per night",
      "hotelImageUrl": "https://www.circuscircus.com/content/dam/caesars/circus-circus/home/hero-image.jpg",
      "geoCoordinates": "36.1207, -115.1687",
      "rating": "3 stars",
      "description": "A classic Las Vegas hotel with a circus theme. It features a large casino, a midway with carnival rides, and several dining options."
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "plan": [
        {
          "time": "9:00 AM - 12:00 PM",
          "placeName": "Fremont Street Experience",
          "placeDetails": "A pedestrian-friendly street in downtown Las Vegas with a canopy of lights and street performers. It's a great place to start your trip and get a feel for the city's energy.",
          "placeImageUrl": "https://www.fremontstreetexperience.com/images/fremont-street-experience/fremont-street-experience.jpg",
          "geoCoordinates": "36.1695, -115.1438",
          "ticketPricing": "Free",
          "timeToTravel": "1 hour"
        }
      ]
    }
  ]
}`
        },
      ],
    },
  ],
});

export const GenerateTripFromAI = async (prompt) => {
  try {
    const strictPrompt = `
${prompt}

IMPORTANT:
- Return ONLY valid JSON
- Do not include markdown
- Do not include \`\`\`
- Do not include explanation text
- Keep exactly these top-level keys: hotels, itinerary
- hotels must contain: hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates, rating, description
- itinerary must contain: day, plan
- each plan item must contain: time, placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, timeToTravel
`;

    const result = await chatSession.sendMessage(strictPrompt);
    let text = result.response.text();

    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("AI ERROR:", error);
    return null;
  }
};