import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const radius = searchParams.get("radius");

  // Google Places API endpoint
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=tourist_attraction&key=${apiKey}`;

  try {
    const response = await fetch(googlePlacesUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Google Places API" },
      { status: 500 }
    );
  }
}
