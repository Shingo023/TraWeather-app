"use client";

import { useParams } from "next/navigation";

const PlaceInfoPage = () => {
  const { lat, lng } = useParams();

  return <h1>Place Information Page</h1>;
};

export default PlaceInfoPage;
