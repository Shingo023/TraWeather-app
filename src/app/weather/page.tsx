"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FavoriteCity } from "@/types";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndRedirect = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const locationDetailsResponse = await fetch(
                `/api/location-details?lat=${latitude}&lng=${longitude}`
              );
              const locationDetailsData = await locationDetailsResponse.json();

              if (locationDetailsData.cityName && locationDetailsData.address) {
                const { cityName, address, placeId } = locationDetailsData;

                router.push(
                  `/weather/${latitude}/${longitude}?place=${encodeURIComponent(
                    cityName
                  )}&address=${encodeURIComponent(address)}&id=${placeId}`
                );
                setLoading(false);
              } else {
                console.error("Failed to retrieve necessary location details.");
                setLoading(false);
              }
            } catch (error) {
              console.error("Error fetching location details:", error);
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    const fetchDefaultCityAndRedirect = async (userId: string) => {
      try {
        const response = await fetch(`/api/users/${userId}/default-city`);

        if (!response.ok) {
          throw new Error("Default city not found");
        }

        const data: FavoriteCity = await response.json();

        if (data) {
          const { latitude, longitude, customName, address, placeId } = data;
          router.push(
            `/weather/${latitude}/${longitude}?place=${encodeURIComponent(
              customName
            )}&address=${encodeURIComponent(address)}&id=${placeId}`
          );
          setLoading(false);
        } else {
          fetchLocationAndRedirect();
        }
      } catch (error) {
        console.error("Error fetching default city:", error);
        fetchLocationAndRedirect();
      }
    };

    // Check if the user is logged in
    if (status === "authenticated" && session?.user?.id) {
      // If logged in, fetch the user's default city
      fetchDefaultCityAndRedirect(session.user.id);
    } else if (status === "unauthenticated") {
      // If not logged in, use the user's current location
      fetchLocationAndRedirect();
    }
  }, [router, session, status]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingMessage}>Loading weather data...</p>
      </div>
    );
  }

  return null;
}
