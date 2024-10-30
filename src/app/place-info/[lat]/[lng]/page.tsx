"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlaceInfoPage = () => {
  const { lat, lng } = useParams();
  const { data: session, status } = useSession();

  const [touristSpots, setTouristSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTouristSpots = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/tourist-spots?lat=${lat}&lon=${lng}&radius=500`
          );
          const touristSpotsData = await response.json();

          setTouristSpots(touristSpotsData);
          console.log(touristSpotsData);
        } catch (error) {
          console.error("Error fetching tourist spots:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    // Only run the effect once the session is loaded and available
    if (status === "authenticated") {
      fetchTouristSpots();
      console.log(touristSpots);
    }
  }, [status, session?.user?.id]);

  if (loading) {
    return <h3>Loading Tourist Spots...</h3>;
  }

  return (
    <div>
      <h1>Place Information Page</h1>
    </div>
  );
};

export default PlaceInfoPage;
