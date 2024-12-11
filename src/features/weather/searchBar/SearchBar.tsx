"use client";

import { useEffect, useRef, useState } from "react";
import { autocompleteSuggestion } from "@/types";
import { debounce } from "@/utils/debounce";
import styles from "./SearchBar.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Search, TriangleAlert } from "lucide-react";
import { fetchPlaceCoordinate, fetchPlacePredictions } from "@/utils/apiHelper";

// "places" library: necessary for autocomplete for addresses and places
const SearchBar = React.memo(() => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    autocompleteSuggestion[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const address = searchParams.get("address");
    const source = searchParams.get("source");

    // Only set the address in the input if the source is 'search'
    if (address && inputRef.current && source === "search") {
      inputRef.current.value = address;
    }
  }, [searchParams]);

  const handleInputChange = debounce(async () => {
    const input = inputRef.current?.value;

    if (!input) {
      setAutocompleteSuggestions([]);
      setError(null);
      return;
    }

    setError(null);

    try {
      const placePredictions = await fetchPlacePredictions(input);

      if (placePredictions) {
        setAutocompleteSuggestions(placePredictions);
      } else {
        setAutocompleteSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
      alert("Failed to fetch suggestions. Please try again.");
    }
  }, 500);

  // Handle place selection and fetch weather data
  const handlePlaceSelect = async (
    placeName: string,
    placeId: string,
    description: string
  ) => {
    setAutocompleteSuggestions([]);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = description;
    }

    try {
      const coordinateData = await fetchPlaceCoordinate(placeId);
      const { latitude, longitude } = coordinateData;

      if (latitude && longitude && placeName && description && placeId) {
        router.push(
          `/weather/${latitude}/${longitude}?place=${placeName}&address=${description}&id=${placeId}&source=search`
        );
      } else {
        alert("Invalid place data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      alert("Failed to fetch place details. Please try again.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (autocompleteSuggestions.length > 0) {
        setError("Please select a suggested place from the list.");
      } else {
        setError(null);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <Search className={styles.searchBar__searchIcon} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search places ..."
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {autocompleteSuggestions.length > 0 && (
        <ul className={styles.searchBar__suggestionsList} role="listbox">
          {error && (
            <div className={styles.searchBar__error}>
              <TriangleAlert className={styles.searchBar__errorIcon} />
              <p>{error}</p>
            </div>
          )}
          {autocompleteSuggestions.map((suggestion) => (
            <li
              className={styles.searchBar__suggestion}
              role="option"
              key={suggestion.place_id}
              onClick={() =>
                handlePlaceSelect(
                  suggestion.structured_formatting.main_text,
                  suggestion.place_id,
                  suggestion.description
                )
              }
            >
              <Search className={styles.searchBar__suggestionIcon} />
              <p>{suggestion.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SearchBar;
