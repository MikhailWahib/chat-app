package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var addr = flag.String("addr", ":8080", "http service address")

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is running"))
	})

	r.HandleFunc("/rooms", GetRooms).Methods("GET")
	// ?name={}&password={}
	r.HandleFunc("/rooms", CreateRoom).Methods("POST")
	// ?id={}&password={}&memberName={}
	r.HandleFunc("/ws", JoinRoom)

	corsHandler := corsMiddleware(r)

	http.Handle("/", r)

	flag.Parse()
	fmt.Println("Server is running on", *addr)
	err := http.ListenAndServe(*addr, corsHandler)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
