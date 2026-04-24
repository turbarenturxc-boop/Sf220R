export const SelectTravelesList = [
    {
        id: 1,
        title: 'Solo',
        desc: 'A solo traveler in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two travelers side by side',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'families traveling together',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Perfect for a group of friends',
        icon: '⛵',
        people: '5 to 10 People'
    },
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Affordable',
        desc: 'Plan a budget-friendly journey',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Mid-range',
        desc: 'A balanced budget journey',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Premium',
        desc: 'high-end travel journey',
        icon: '💸',
    },
]


export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'