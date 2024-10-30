// import Script from "next/script";
// import { useEffect, useRef } from "react";

// export default function MapComponent({lat, lng}:{lat:string, lng:string}) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Initialize the map only after the Google Maps API is loaded
//     if (typeof window !== "undefined" && window.google) {
//       initMap();
//     }
//   }, []);

//   const initMap = () => {
//     const map = new google.maps.Map(mapRef.current, {
//       center: { lat, lng },
//       zoom: 14,
//     });

//     // Fetch and add tourist spot markers to the map
//     fetchTouristSpots(YOUR_LATITUDE, YOUR_LONGITUDE, 1000, map);
//   };

//   return (
//     <>
//       <Script
//         src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`}
//         onLoad={() => initMap()}
//         async
//         defer
//       />
//       <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
//     </>
//   );
// }
