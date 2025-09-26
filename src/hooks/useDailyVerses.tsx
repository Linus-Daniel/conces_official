// hooks/useDailyVerse.ts
import { useEffect, useState } from "react";

type VerseData = {
  reference: string;
  content: string;
  isLoading: boolean;
  error: string | null;
};

const useDailyVerse = () => {
  const [verseData, setVerseData] = useState<VerseData>({
    reference: "",
    content: "",
    isLoading: true,
    error: null,
  });

  const API_KEY = "6489125d811268f58432b108db5cd69b";
  const BIBLE_ID = "de4e12af7f28f599-01"; // ESV

  // Generate verse references programmatically
  const generateVerseReferences = () => {
    const books = [
      { abbr: "PSA", chapters: 150 },
      { abbr: "PRO", chapters: 31 },
      { abbr: "JHN", chapters: 21 },
      { abbr: "ROM", chapters: 16 },
      { abbr: "1COR", chapters: 16 },
      { abbr: "2COR", chapters: 13 },
      { abbr: "GAL", chapters: 6 },
      { abbr: "EPH", chapters: 6 },
      { abbr: "PHP", chapters: 4 },
      { abbr: "COL", chapters: 4 },
      { abbr: "1TH", chapters: 5 },
      { abbr: "2TH", chapters: 3 },
      { abbr: "1TI", chapters: 6 },
      { abbr: "2TI", chapters: 4 },
      { abbr: "HEB", chapters: 13 },
      { abbr: "JAS", chapters: 5 },
      { abbr: "1PE", chapters: 5 },
      { abbr: "2PE", chapters: 3 },
      { abbr: "1JN", chapters: 5 },
      { abbr: "ISA", chapters: 66 },
      { abbr: "JER", chapters: 52 },
      { abbr: "MAT", chapters: 28 },
      { abbr: "MRK", chapters: 16 },
      { abbr: "LUK", chapters: 24 },
    ];

    // Use day of year for more variety
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Select book based on day of year
    const bookIndex = dayOfYear % books.length;
    const selectedBook = books[bookIndex];

    // Select chapter based on a hash of the current date
    const date = new Date();
    const dateHash = date.getDate() + date.getMonth() * 31;
    const chapter = (dateHash % selectedBook.chapters) + 1;

    return `${selectedBook.abbr}.${chapter}`;
  };

  // Alternative: Use curated popular verses with weighted selection
  const getCuratedVerse = () => {
    const popularVerses = [
      // Comfort & Peace
      "JER.29.11",
      "PSA.23",
      "PHP.4.13",
      "ISA.41.10",
      "PSA.46.1",
      "MAT.11.28-30",
      "PSA.91.1-2",
      "PSA.34.17-18",

      // Faith & Trust
      "PRO.3.5-6",
      "HEB.11.1",
      "ROM.8.28",
      "PSA.37.4",
      "ISA.26.3",
      "PSA.56.3",
      "NAH.1.7",
      "PSA.62.8",

      // Love & Relationships
      "JHN.3.16",
      "1COR.13.4-7",
      "ROM.8.38-39",
      "1JN.4.19",
      "EPH.4.32",
      "COL.3.13",
      "1PE.4.8",
      "JHN.15.12",

      // Strength & Courage
      "JOS.1.9",
      "ISA.40.31",
      "2TI.1.7",
      "DEU.31.6",
      "PSA.27.1",
      "EPH.6.10",
      "PSA.18.32",
      "1COR.16.13",

      // Wisdom & Guidance
      "JAS.1.5",
      "PSA.119.105",
      "PRO.16.9",
      "PSA.32.8",
      "PRO.2.6",
      "PSA.25.9",
      "ISA.30.21",
      "PRO.4.23",

      // Hope & Joy
      "ROM.15.13",
      "PSA.30.5",
      "LAM.3.22-23",
      "PSA.16.11",
      "ROM.12.12",
      "1PE.1.3",
      "PSA.42.11",
      "PHP.4.4",
    ];

    // Use a combination of date factors for verse selection
    const date = new Date();
    const dayOfYear = Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Create a pseudo-random but consistent index for the day
    const seed = dayOfYear + date.getFullYear();
    const index = seed % popularVerses.length;

    return popularVerses[index];
  };

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setVerseData((prev) => ({ ...prev, isLoading: true, error: null }));

        // Use curated verses for better quality
        // You can switch to generateVerseReferences() for more variety
        const verseID = getCuratedVerse();

        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${verseID}`,
          {
            headers: {
              "api-key": API_KEY,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.data) {
          setVerseData({
            reference: result.data.reference || verseID,
            content: result.data.content || "Unable to load verse content",
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching verse:", error);
        setVerseData({
          reference: "Philippians 4:13",
          content: "I can do all things through him who strengthens me.",
          isLoading: false,
          error: "Using fallback verse due to loading error",
        });
      }
    };

    fetchVerse();
  }, []);

  return verseData;
};

export default useDailyVerse;
