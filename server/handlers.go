package main

import (
	"encoding/json"
	"net/http"
)

var rooms = make(map[string]*Room, 0)

func GetRooms(w http.ResponseWriter, r *http.Request) {
	var roomsResp []Room
	for _, r := range rooms {
		roomsResp = append(roomsResp, *r)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(roomsResp)
}

func CreateRoom(w http.ResponseWriter, r *http.Request) {
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

}

func HandleWs(w http.ResponseWriter, r *http.Request) {
	roomId := r.URL.Query().Get("id")
	roomPassword := r.URL.Query().Get("password")
	w.Header().Set("Content-Type", "application/json")

	room, found := rooms[roomId]
	if !found {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Room with this ID not found"})
		return
	}

	if roomPassword != room.password {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Wrong Room password"})

		return
	}

	serveWs(room, w, r)
}
