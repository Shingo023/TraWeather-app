"use client";

import { useEffect, useRef, useState } from "react";
import { autocompleteSuggestion } from "@/types";
import { debounce } from "@/utils/debounce";
import styles from "./SearchBar.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CircleX, Search, TriangleAlert } from "lucide-react";
import { fetchPlaceCoordinate, fetchPlacePredictions } from "@/utils/apiHelper";
import useMediaQuery from "@/hooks/useMediaQuery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// "places" library: necessary for autocomplete for addresses and places
const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    autocompleteSuggestion[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 480px)");

  // useEffect(() => {
  //   const address = searchParams.get("address");
  //   const source = searchParams.get("source");

  //   // Only set the address in the input if the source is 'search'
  //   if (address && source === "search") {
  //     setInputValue(address);
  //   }
  // }, [searchParams, inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputValue(input);
    debouncedFetchSuggestions(input);
  };

  const debouncedFetchSuggestions = debounce(async (input: string) => {
    if (!input.trim()) {
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
      toast.error("Failed to fetch suggestions. Please try again.");
    }
  }, 100);

  const clearInput = () => {
    setInputValue("");
    setAutocompleteSuggestions([]);
    inputRef.current?.focus();
  };

  // Handle place selection and fetch weather data
  const handlePlaceSelect = async (
    placeName: string,
    placeId: string,
    description: string
  ) => {
    setAutocompleteSuggestions([]);
    setError(null);
    setInputValue(description);
    setSelectedPlaceId(placeId);

    try {
      const coordinateData = await fetchPlaceCoordinate(placeId);
      const { latitude, longitude } = coordinateData;

      if (latitude && longitude && placeName && description && placeId) {
        router.push(
          // `/weather/${latitude}/${longitude}?place=${placeName}&address=${description}&id=${placeId}&source=search`
          `/weather/${latitude}/${longitude}?place=${placeName}&address=${description}&id=${placeId}`
        );
      } else {
        toast.error("Invalid place data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      toast.error("Failed to fetch place details. Please try again.");
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

  const handleClick = () => {
    setShowSearchBar((prev) => {
      if (prev === true && inputValue) {
        clearInput();
      }
      return !prev;
    });
    if (!showSearchBar) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className={styles.searchBar}>
      {isMobile && (
        <div
          className={styles.searchBar__searchBarToggle}
          onClick={handleClick}
        >
          <div
            className={`iconContainer  ${styles.searchIcon} ${styles["searchIcon--large"]}`}
          >
            <Search className="icon" />
          </div>
        </div>
      )}

      <div
        className={`${styles.searchBar__inputField} ${
          showSearchBar ? styles["searchBar__inputField--showSearchBar"] : ""
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search places ..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        {!isMobile && (
          <div
            className={`iconContainer  ${styles.searchIcon} ${styles["searchIcon--small"]}`}
          >
            <Search className="icon" />
          </div>
        )}

        {inputValue && (
          <div
            className={`iconContainer ${styles.clearIcon}`}
            onClick={clearInput}
          >
            <CircleX className="icon" />
          </div>
        )}

        {autocompleteSuggestions.length > 0 && (
          <ul className={styles.placeSuggestions__list} role="listbox">
            {error && (
              <section className={styles.placeSuggestions__error}>
                <div className={`iconContainer ${styles.warningIcon}`}>
                  <TriangleAlert className="icon" />
                </div>
                <p>{error}</p>
              </section>
            )}
            {autocompleteSuggestions.map((suggestion) => (
              <li
                className={styles.placeSuggestions__item}
                role="option"
                key={suggestion.place_id}
                onClick={() =>
                  handlePlaceSelect(
                    suggestion.structured_formatting.main_text,
                    suggestion.place_id,
                    suggestion.description
                  )
                }
                aria-selected={
                  selectedPlaceId === suggestion.place_id ? "true" : "false"
                }
              >
                <div
                  className={`iconContainer  ${styles.searchIcon} ${styles["searchIcon--middle"]}`}
                >
                  <Search className="icon" />
                </div>
                <p>{suggestion.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
