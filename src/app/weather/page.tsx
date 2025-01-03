"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchDefaultCity, fetchLocationDetails } from "@/utils/apiHelper";
import { DefaultCityType, LocationDetailsType } from "@/types";
import LoadingSpinner from "../components/elements/loadingSpinner/LoadingSpinner";

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

  const fetchLocationAndRedirect = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const locationDetails: LocationDetailsType =
            await fetchLocationDetails(latitude, longitude);
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
  }, [DEFAULT_LOCATION, router]);

  const fetchDefaultCityAndRedirect = useCallback(
    async (userId: string) => {
      try {
        const defaultCityData: DefaultCityType = await fetchDefaultCity(userId);

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
    },
    [fetchLocationAndRedirect, router]
  );

  useEffect(() => {
    // Check if the user is logged in
    if (status === "authenticated" && session?.user?.id) {
      // If logged in, fetch the user's default city
      fetchDefaultCityAndRedirect(session.user.id);
    } else if (status === "unauthenticated") {
      // If not logged in, use the user's current location
      fetchLocationAndRedirect();
    }
  }, [
    router,
    session,
    status,
    fetchDefaultCityAndRedirect,
    fetchLocationAndRedirect,
  ]);

  if (loading) {
    return <LoadingSpinner message="Loading weather data..." />;
  }
  return null;
}
function callBack(arg0: () => Promise<void>, arg1: never[]) {
  throw new Error("Function not implemented.");
}
