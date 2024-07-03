package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"
)

const charset = "abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func seededRand() *rand.Rand {
	return rand.New(rand.NewSource(time.Now().UnixNano()))
}

func stringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand().Intn(len(charset))]
	}
	return string(b)
}

func GenerateId(length int) string {
	return stringWithCharset(length, charset)
}

func JsonResponse(w http.ResponseWriter, data any, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}
