"use client";

import { DateTime } from "luxon";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultGuest, normalizeGuestProfile, type GuestProfile } from "./models/guest";
import { events, type EventDetail } from "./data/events";
import { giftRegistry, type GiftItem } from "./data/gifts";
import { travelOptions, type TravelOption } from "./data/travel";

export interface RSVPRecord {
  attendingEvents: Record<string, boolean>;
  mealChoice?: string;
  dietaryNotes?: string;
  plusOneName?: string;
  plusOneDietary?: string;
  kidsCount?: number;
  message?: string;
  consentEmail?: boolean;
  consentSms?: boolean;
  timestamp?: string;
}

export interface MusicRequest {
  song: string;
  artist: string;
  dedication?: string;
  energy: "chill" | "dance" | "wild";
}

export interface GuestbookEntry {
  name: string;
  message: string;
  mood: "teary" | "cheering" | "nostalgic" | "playful";
  createdAt: string;
}

interface PersonalizationContextValue {
  guest: GuestProfile;
  setGuestCode: (code: string | null) => void;
  rsvp: RSVPRecord | null;
  saveRSVP: (record: RSVPRecord) => void;
  musicRequests: MusicRequest[];
  submitMusicRequest: (request: MusicRequest) => void;
  guestbookEntries: GuestbookEntry[];
  addGuestbookEntry: (entry: GuestbookEntry) => void;
  getPersonalizedEvents: () => EventDetail[];
  getPersonalizedGifts: () => GiftItem[];
  getTravelOptions: () => TravelOption[];
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  theme: "default" | "contrast";
  toggleTheme: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "personalized-wedding";

interface StoredData {
  guestCode: string;
  rsvp?: RSVPRecord;
  musicRequests?: MusicRequest[];
  guestbook?: GuestbookEntry[];
  theme?: "default" | "contrast";
}

const weddingDate = DateTime.fromISO("2025-06-21T15:30:00", { zone: "America/New_York" });

function computeCountdown(timezone?: string) {
  const now = DateTime.now().setZone(timezone ?? "America/New_York");
  const diff = weddingDate.diff(now, ["days", "hours", "minutes", "seconds"]);

  return {
    days: Math.max(Math.floor(diff.days), 0),
    hours: Math.max(Math.floor(diff.hours) % 24, 0),
    minutes: Math.max(Math.floor(diff.minutes) % 60, 0),
    seconds: Math.max(Math.floor(diff.seconds) % 60, 0)
  };
}

function usePersistedState(): [StoredData, (data: StoredData) => void] {
  const [stored, setStored] = useState<StoredData>(() => {
    if (typeof window === "undefined") return { guestCode: defaultGuest.code };
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) {
        return JSON.parse(existing) as StoredData;
      }
    } catch (error) {
      console.error("Unable to parse stored personalization", error);
    }
    return { guestCode: defaultGuest.code };
  });

  const update = (data: StoredData) => {
    setStored(data);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  return [stored, update];
}

export function PersonalizationProvider({
  initialCode,
  children
}: {
  initialCode?: string | null;
  children: React.ReactNode;
}) {
  const [stored, setStored] = usePersistedState();
  const [guestCode, setGuestCodeState] = useState<string>(
    initialCode ?? stored.guestCode ?? defaultGuest.code
  );
  const [guest, setGuest] = useState<GuestProfile>(defaultGuest);
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

  useEffect(() => {
    if (initialCode && initialCode !== stored.guestCode) {
      setStored({ ...stored, guestCode: initialCode });
      setGuestCodeState(initialCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  useEffect(() => {
    let cancelled = false;
    const normalizedCode = guestCode?.toUpperCase() || defaultGuest.code;

    if (!normalizedCode || normalizedCode === defaultGuest.code) {
      setGuest(defaultGuest);
      return () => {
        cancelled = true;
      };
    }

    const fetchGuest = async () => {
      try {
        const response = await fetch(`${backendBase}/api/guests/${encodeURIComponent(normalizedCode)}`);
        if (!response.ok) {
          throw new Error(`Failed to load guest: ${response.status}`);
        }
        const data = (await response.json()) as Partial<GuestProfile>;
        if (!cancelled) {
          setGuest(normalizeGuestProfile(data));
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setGuest(defaultGuest);
        }
      }
    };

    fetchGuest();

    return () => {
      cancelled = true;
    };
  }, [backendBase, guestCode]);

  const rsvp = stored.rsvp ?? null;
  const musicRequests = useMemo(() => stored.musicRequests ?? [], [stored.musicRequests]);
  const guestbookEntries = useMemo(() => stored.guestbook ?? [], [stored.guestbook]);
  const theme = stored.theme ?? "default";

  const setGuestCode = useCallback(
    (code: string | null) => {
      const normalized = code?.toUpperCase() ?? defaultGuest.code;
      setGuest(defaultGuest);
      setGuestCodeState(normalized);
      setStored({ ...stored, guestCode: normalized });
    },
    [setStored, stored, setGuest]
  );

  const saveRSVP = useCallback(
    (record: RSVPRecord) => {
      setStored({ ...stored, guestCode, rsvp: { ...record, timestamp: new Date().toISOString() } });
    },
    [guestCode, setStored, stored]
  );

  const submitMusicRequest = useCallback(
    (request: MusicRequest) => {
      setStored({
        ...stored,
        guestCode,
        musicRequests: [...musicRequests, request]
      });
    },
    [guestCode, musicRequests, setStored, stored]
  );

  const addGuestbookEntry = useCallback(
    (entry: GuestbookEntry) => {
      setStored({
        ...stored,
        guestCode,
        guestbook: [...guestbookEntries, entry]
      });
    },
    [guestCode, guestbookEntries, setStored, stored]
  );

  const getPersonalizedEvents = useCallback(() => {
    return events.filter((event) => guest.eventsInvited.includes(event.id));
  }, [guest.eventsInvited]);

  const getPersonalizedGifts = useCallback(() => {
    return giftRegistry.filter(
      (gift) => gift.priceRange === guest.budgetHint || gift.priceRange === "experience"
    );
  }, [guest.budgetHint]);

  const getTravelOptions = useCallback(() => {
    return travelOptions.filter((option) => {
      if (option.cityTag && !guest.city.toLowerCase().includes(option.cityTag.toLowerCase())) return false;
      return true;
    });
  }, [guest.city]);

  const [countdown, setCountdown] = useState(() => computeCountdown(guest.timezone));

  useEffect(() => {
    setCountdown(computeCountdown(guest.timezone));

    if (typeof window === "undefined") {
      return;
    }

    const interval = window.setInterval(() => {
      setCountdown(computeCountdown(guest.timezone));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [guest.timezone]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "default" ? "contrast" : "default";
    setStored({ ...stored, guestCode, theme: nextTheme });
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = nextTheme === "contrast" ? "contrast" : "default";
    }
  }, [guestCode, setStored, stored, theme]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme === "contrast" ? "contrast" : "default";
    }
  }, [theme]);

  const value = useMemo<PersonalizationContextValue>(
    () => ({
      guest,
      setGuestCode,
      rsvp,
      saveRSVP,
      musicRequests,
      submitMusicRequest,
      guestbookEntries,
      addGuestbookEntry,
      getPersonalizedEvents,
      getPersonalizedGifts,
      getTravelOptions,
      countdown,
      theme,
      toggleTheme
    }), [
      guest,
      setGuestCode,
      rsvp,
      saveRSVP,
      musicRequests,
      submitMusicRequest,
      guestbookEntries,
      addGuestbookEntry,
      getPersonalizedEvents,
      getPersonalizedGifts,
      getTravelOptions,
      countdown,
      theme,
      toggleTheme
    ]
  );

  return <PersonalizationContext.Provider value={value}>{children}</PersonalizationContext.Provider>;
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error("usePersonalization must be used within PersonalizationProvider");
  }
  return context;
}
