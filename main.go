package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var addr = flag.String("addr", ":8080", "http service address")

func main() {
	var rooms = make(map[string]*Room, 0)
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is running"))
	})

	r.HandleFunc("/room", func(w http.ResponseWriter, r *http.Request) {
		name := r.URL.Query().Get("name")
		password := r.URL.Query().Get("password")

		w.Header().Set("Content-Type", "application/json")
		if name == "" || password == "" {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "Room must have a name and a password"})

			return
		}

		room := newRoom(name, password)
		rooms[room.ID] = room

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "Room '" + name + "' has been created successfully", "roomId": room.ID})

		go room.run()

	}).Methods("POST")

	r.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		roomId := r.URL.Query().Get("roomId")
		roomPassword := r.URL.Query().Get("roomPassword")
		w.Header().Set("Content-Type", "application/json")

		room, found := rooms[roomId]
		if !found {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Room with this ID not found"})
			return
		}

		if roomPassword != room.Password {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "Wrong Room password"})

			return
		}

		serveWs(room, w, r)
	})

	http.Handle("/", r)

	flag.Parse()
	fmt.Println("Server is running on", *addr)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
