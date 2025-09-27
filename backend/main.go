package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	_ "modernc.org/sqlite"
)

type Guest struct {
	Code            string    `json:"code"`
	Name            string    `json:"name"`
	Relation        string    `json:"relation"`
	Side            string    `json:"side"`
	Role            string    `json:"role"`
	City            string    `json:"city"`
	Timezone        string    `json:"timezone"`
	Language        string    `json:"language"`
	Dietary         []string  `json:"dietary,omitempty"`
	Accessibility   []string  `json:"accessibility,omitempty"`
	Interests       []string  `json:"interests,omitempty"`
	BudgetHint      string    `json:"budgetHint"`
	IsOutOfTown     bool      `json:"isOutOfTown"`
	EventsInvited   []string  `json:"eventsInvited"`
	HotelPreference *string   `json:"hotelPreference,omitempty"`
	TravelNotes     *string   `json:"travelNotes,omitempty"`
	KidsAllowed     *bool     `json:"kidsAllowed,omitempty"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

type guestPayload struct {
	Name            string   `json:"name"`
	Relation        string   `json:"relation"`
	Side            string   `json:"side"`
	Role            string   `json:"role"`
	City            string   `json:"city"`
	Timezone        string   `json:"timezone"`
	Language        string   `json:"language"`
	Dietary         []string `json:"dietary"`
	Accessibility   []string `json:"accessibility"`
	Interests       []string `json:"interests"`
	BudgetHint      string   `json:"budgetHint"`
	IsOutOfTown     bool     `json:"isOutOfTown"`
	EventsInvited   []string `json:"eventsInvited"`
	HotelPreference *string  `json:"hotelPreference"`
	TravelNotes     *string  `json:"travelNotes"`
	KidsAllowed     *bool    `json:"kidsAllowed"`
}

type createGuestResponse struct {
	Guest Guest `json:"guest"`
}

func main() {
	rand.Seed(time.Now().UnixNano())

	dbPath := os.Getenv("DATABASE_URL")
	if dbPath == "" {
		dbPath = "file:wedding.db?_fk=1"
	}

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}
	defer db.Close()

	if err := migrate(db); err != nil {
		log.Fatalf("failed to run migrations: %v", err)
	}

	router := chi.NewRouter()
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	router.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	router.Route("/api", func(r chi.Router) {
		r.Route("/guests", func(r chi.Router) {
			r.Get("/", func(w http.ResponseWriter, r *http.Request) {
				guests, err := listGuests(r.Context(), db)
				if err != nil {
					respondError(w, http.StatusInternalServerError, "failed to list guests")
					return
				}
				respondJSON(w, http.StatusOK, guests)
			})

			r.Post("/", func(w http.ResponseWriter, r *http.Request) {
				var payload guestPayload
				if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
					respondError(w, http.StatusBadRequest, "invalid request body")
					return
				}
				if err := validateGuestPayload(payload); err != nil {
					respondError(w, http.StatusBadRequest, err.Error())
					return
				}
				guest, err := createGuest(r.Context(), db, payload)
				if err != nil {
					respondError(w, http.StatusInternalServerError, err.Error())
					return
				}
				respondJSON(w, http.StatusCreated, createGuestResponse{Guest: guest})
			})

			r.Get("/{code}", func(w http.ResponseWriter, r *http.Request) {
				code := strings.ToUpper(chi.URLParam(r, "code"))
				guest, err := getGuest(r.Context(), db, code)
				if errors.Is(err, sql.ErrNoRows) {
					respondError(w, http.StatusNotFound, "guest not found")
					return
				}
				if err != nil {
					respondError(w, http.StatusInternalServerError, "failed to load guest")
					return
				}
				respondJSON(w, http.StatusOK, guest)
			})
		})
	})

	addr := ":8080"
	if port := os.Getenv("PORT"); port != "" {
		addr = fmt.Sprintf(":%s", port)
	}

	log.Printf("wedding backend listening on %s", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatalf("server exited: %v", err)
	}
}

func migrate(db *sql.DB) error {
	const schema = `
CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    relation TEXT NOT NULL,
    side TEXT NOT NULL,
    role TEXT NOT NULL,
    city TEXT NOT NULL,
    timezone TEXT NOT NULL,
    language TEXT NOT NULL,
    dietary TEXT,
    accessibility TEXT,
    interests TEXT,
    budget_hint TEXT NOT NULL,
    is_out_of_town INTEGER NOT NULL,
    events_invited TEXT NOT NULL,
    hotel_preference TEXT,
    travel_notes TEXT,
    kids_allowed INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_guests_code ON guests(code);
`
	_, err := db.Exec(schema)
	return err
}

func listGuests(ctx context.Context, db *sql.DB) ([]Guest, error) {
	rows, err := db.QueryContext(ctx, `
        SELECT code, name, relation, side, role, city, timezone, language, dietary, accessibility,
               interests, budget_hint, is_out_of_town, events_invited, hotel_preference, travel_notes,
               kids_allowed, created_at, updated_at
          FROM guests
         ORDER BY created_at ASC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	guests := []Guest{}
	for rows.Next() {
		guest, err := scanGuest(rows)
		if err != nil {
			return nil, err
		}
		guests = append(guests, guest)
	}
	return guests, rows.Err()
}

func getGuest(ctx context.Context, db *sql.DB, code string) (Guest, error) {
	row := db.QueryRowContext(ctx, `
        SELECT code, name, relation, side, role, city, timezone, language, dietary, accessibility,
               interests, budget_hint, is_out_of_town, events_invited, hotel_preference, travel_notes,
               kids_allowed, created_at, updated_at
          FROM guests
         WHERE code = ?`, code)
	return scanGuest(row)
}

func createGuest(ctx context.Context, db *sql.DB, payload guestPayload) (Guest, error) {
	code := generateCode()
	now := time.Now().UTC()

	dietaryJSON, err := json.Marshal(payload.Dietary)
	if err != nil {
		return Guest{}, fmt.Errorf("failed to encode dietary: %w", err)
	}
	accessibilityJSON, err := json.Marshal(payload.Accessibility)
	if err != nil {
		return Guest{}, fmt.Errorf("failed to encode accessibility: %w", err)
	}
	interestsJSON, err := json.Marshal(payload.Interests)
	if err != nil {
		return Guest{}, fmt.Errorf("failed to encode interests: %w", err)
	}
	eventsJSON, err := json.Marshal(payload.EventsInvited)
	if err != nil {
		return Guest{}, fmt.Errorf("failed to encode events: %w", err)
	}

	var kidsAllowedInt interface{}
	if payload.KidsAllowed != nil {
		if *payload.KidsAllowed {
			kidsAllowedInt = 1
		} else {
			kidsAllowedInt = 0
		}
	}

	_, err = db.ExecContext(ctx, `
        INSERT INTO guests (
            code, name, relation, side, role, city, timezone, language,
            dietary, accessibility, interests, budget_hint, is_out_of_town,
            events_invited, hotel_preference, travel_notes, kids_allowed,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, code, payload.Name, payload.Relation, payload.Side, payload.Role, payload.City, payload.Timezone,
		payload.Language, string(dietaryJSON), string(accessibilityJSON), string(interestsJSON), payload.BudgetHint,
		boolToInt(payload.IsOutOfTown), string(eventsJSON), payload.HotelPreference, payload.TravelNotes,
		kidsAllowedInt, now.Format(time.RFC3339), now.Format(time.RFC3339))
	if err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "unique") {
			return createGuest(ctx, db, payload)
		}
		return Guest{}, fmt.Errorf("failed to insert guest: %w", err)
	}

	return Guest{
		Code:            code,
		Name:            payload.Name,
		Relation:        payload.Relation,
		Side:            payload.Side,
		Role:            payload.Role,
		City:            payload.City,
		Timezone:        payload.Timezone,
		Language:        payload.Language,
		Dietary:         payload.Dietary,
		Accessibility:   payload.Accessibility,
		Interests:       payload.Interests,
		BudgetHint:      payload.BudgetHint,
		IsOutOfTown:     payload.IsOutOfTown,
		EventsInvited:   payload.EventsInvited,
		HotelPreference: payload.HotelPreference,
		TravelNotes:     payload.TravelNotes,
		KidsAllowed:     payload.KidsAllowed,
		CreatedAt:       now,
		UpdatedAt:       now,
	}, nil
}

type scanner interface {
	Scan(dest ...any) error
}

func scanGuest(row scanner) (Guest, error) {
	var (
		dietaryJSON       sql.NullString
		accessibilityJSON sql.NullString
		interestsJSON     sql.NullString
		eventsJSON        sql.NullString
		hotelPref         sql.NullString
		travelNotes       sql.NullString
		kidsAllowed       sql.NullInt64
		createdAt         string
		updatedAt         string
		guest             Guest
	)

	if err := row.Scan(
		&guest.Code,
		&guest.Name,
		&guest.Relation,
		&guest.Side,
		&guest.Role,
		&guest.City,
		&guest.Timezone,
		&guest.Language,
		&dietaryJSON,
		&accessibilityJSON,
		&interestsJSON,
		&guest.BudgetHint,
		&guest.IsOutOfTown,
		&eventsJSON,
		&hotelPref,
		&travelNotes,
		&kidsAllowed,
		&createdAt,
		&updatedAt,
	); err != nil {
		return Guest{}, err
	}

	guest.Dietary = decodeStringSlice(dietaryJSON.String)
	guest.Accessibility = decodeStringSlice(accessibilityJSON.String)
	guest.Interests = decodeStringSlice(interestsJSON.String)
	guest.EventsInvited = decodeStringSlice(eventsJSON.String)

	if hotelPref.Valid {
		guest.HotelPreference = &hotelPref.String
	}
	if travelNotes.Valid {
		guest.TravelNotes = &travelNotes.String
	}
	if kidsAllowed.Valid {
		v := kidsAllowed.Int64 != 0
		guest.KidsAllowed = &v
	}

	if parsed, err := time.Parse(time.RFC3339, createdAt); err == nil {
		guest.CreatedAt = parsed
	}
	if parsed, err := time.Parse(time.RFC3339, updatedAt); err == nil {
		guest.UpdatedAt = parsed
	}

	return guest, nil
}

func decodeStringSlice(raw string) []string {
	if strings.TrimSpace(raw) == "" {
		return []string{}
	}
	var items []string
	if err := json.Unmarshal([]byte(raw), &items); err != nil {
		return []string{}
	}
	return items
}

func boolToInt(value bool) int {
	if value {
		return 1
	}
	return 0
}

func generateCode() string {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	const length = 6
	var b strings.Builder
	for i := 0; i < length; i++ {
		b.WriteByte(chars[rand.Intn(len(chars))])
	}
	return b.String()
}

func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("failed to write response: %v", err)
	}
}

func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]string{"error": message})
}

func validateGuestPayload(payload guestPayload) error {
	if strings.TrimSpace(payload.Name) == "" {
		return errors.New("name is required")
	}
	if strings.TrimSpace(payload.Relation) == "" {
		return errors.New("relation is required")
	}
	if strings.TrimSpace(payload.Side) == "" {
		return errors.New("side is required")
	}
	if strings.TrimSpace(payload.Role) == "" {
		return errors.New("role is required")
	}
	if strings.TrimSpace(payload.City) == "" {
		return errors.New("city is required")
	}
	if strings.TrimSpace(payload.Timezone) == "" {
		return errors.New("timezone is required")
	}
	if strings.TrimSpace(payload.Language) == "" {
		return errors.New("language is required")
	}
	if strings.TrimSpace(payload.BudgetHint) == "" {
		return errors.New("budgetHint is required")
	}
	if len(payload.EventsInvited) == 0 {
		return errors.New("at least one invited event is required")
	}
	return nil
}
