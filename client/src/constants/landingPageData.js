// Dummy data arrays for Landing Page

export const travelCards = [
  { id: 1, destination: "Bali", price: "$899", image: "🏝️", rating: 4.9 },
  { id: 2, destination: "Paris", price: "$1,299", image: "🗼", rating: 4.8 },
  { id: 3, destination: "Tokyo", price: "$1,499", image: "🗾", rating: 5.0 },
];

export const features = [
  {
    icon: "MapPin",
    title: "Curated Destinations",
    description: "Handpicked locations from around the globe, carefully selected to offer unique experiences."
  },
  {
    icon: "Shield",
    title: "Secure Booking",
    description: "Book with confidence using our secure payment system and comprehensive travel insurance."
  },
  {
    icon: "Clock",
    title: "24/7 Support",
    description: "Our dedicated team is available around the clock to assist you throughout your journey."
  },
  {
    icon: "Star",
    title: "Best Price Guarantee",
    description: "We guarantee the best prices on all destinations with our price match promise."
  }
];

// Import images
import santoriniImg from '../bougainvillea-santorini-white-village-beautiful (1).jpg';
import barcelonaImg from '../barcelona.jpg';
import icelandImg from '../iceland.jpg';
import japanImg from '../japan.jpg';
import parisImg from '../paris.jpg';

export const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: santoriniImg,
    price: "$1,199",
    duration: "7 days",
    rating: 4.9,
    reviews: 234
  },
  {
    id: 2,
    name: "Maldives",
    image: icelandImg, // Reusing Iceland for tropical/water scenery
    price: "$2,499",
    duration: "10 days",
    rating: 5.0,
    reviews: 189
  },
  {
    id: 3,
    name: "Swiss Alps",
    image: icelandImg, // Reusing Iceland for mountain scenery
    price: "$1,799",
    duration: "8 days",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 4,
    name: "Dubai, UAE",
    image: barcelonaImg, // Reusing Barcelona for city scenery
    price: "$1,599",
    duration: "6 days",
    rating: 4.7,
    reviews: 298
  },
  {
    id: 5,
    name: "Bali, Indonesia",
    image: japanImg, // Reusing Japan for Asian tropical scenery
    price: "$899",
    duration: "9 days",
    rating: 4.9,
    reviews: 412
  },
  {
    id: 6,
    name: "Paris, France",
    image: parisImg,
    price: "$1,399",
    duration: "5 days",
    rating: 4.8,
    reviews: 567
  },
  {
    id: 7,
    name: "Tokyo, Japan",
    image: japanImg,
    price: "$1,899",
    duration: "8 days",
    rating: 5.0,
    reviews: 345
  },
  {
    id: 8,
    name: "Iceland",
    image: icelandImg,
    price: "$2,199",
    duration: "7 days",
    rating: 4.9,
    reviews: 223
  },
  {
    id: 9,
    name: "Barcelona, Spain",
    image: barcelonaImg,
    price: "$1,299",
    duration: "6 days",
    rating: 4.8,
    reviews: 287
  }
];

export const steps = [
  {
    number: "01",
    title: "Choose Your Destination",
    description: "Browse our curated collection of destinations and find your perfect getaway."
  },
  {
    number: "02",
    title: "Customize Your Trip",
    description: "Personalize your itinerary with activities, accommodations, and experiences."
  },
  {
    number: "03",
    title: "Book & Travel",
    description: "Complete your booking securely and embark on your unforgettable adventure."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "TourismHub made planning our honeymoon effortless. The attention to detail and personalized recommendations were outstanding!",
    rating: 5,
    avatar: "👩"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    text: "Best travel experience ever! The 24/7 support team was incredibly helpful when we needed to make last-minute changes.",
    rating: 5,
    avatar: "👨"
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    text: "I've used many travel platforms, but TourismHub stands out with its curated destinations and seamless booking process.",
    rating: 5,
    avatar: "👩‍🦰"
  }
];
