"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";
import { fetchDefaultCity, fetchLocationDetails } from "@/utils/apiHelper";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const DEFAULT_LOCATION = {
    latitude: 49.2827291,
    longitude: -123.1207375,
    cityName: "Vancouver",
    address: "Vancouver, BC, Canada",
    placeId: "ChIJs0-pQ_FzhlQRi_OBm-qWkbs",
  };

  const fetchLocationAndRedirect = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const locationDetails = await fetchLocationDetails(
            latitude,
            longitude
          );
          router.push(
            `/weather/${latitude}/${longitude}?place=${encodeURIComponent(
              locationDetails.cityName
            )}&address=${encodeURIComponent(locationDetails.address)}&id=${
              locationDetails.placeId
            }`
          );
        } catch (error) {
          console.error("Error fetching location details:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let reason = "Geolocation failed.";
        if (error.code === 1) reason = "Permission denied.";
        else if (error.code === 2) reason = "Position unavailable.";
        else if (error.code === 3) reason = "Request timed out.";
        console.warn(`Using default location: ${reason}`);
        router.push(
          `/weather/${DEFAULT_LOCATION.latitude}/${
            DEFAULT_LOCATION.longitude
          }?place=${encodeURIComponent(
            DEFAULT_LOCATION.cityName
          )}&address=${encodeURIComponent(DEFAULT_LOCATION.address)}&id=${
            DEFAULT_LOCATION.placeId
          }`
        );
        setLoading(false);
      }
    );
  };

  const fetchDefaultCityAndRedirect = async (userId: string) => {
    try {
      const defaultCityData = await fetchDefaultCity(userId);

      if (defaultCityData) {
        const { latitude, longitude, customName, address, placeId } =
          defaultCityData;
        router.push(
          `/weather/${latitude}/${longitude}?place=${encodeURIComponent(
            customName
          )}&address=${encodeURIComponent(address)}&id=${placeId}`
        );
      } else {
        fetchLocationAndRedirect();
      }
    } catch (error) {
      console.error("Error fetching default city:", error);
      fetchLocationAndRedirect();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
