package main

import (
	"fmt"
	"net/http"
)

type RoomsRes struct {
	Id      string   `json:"id"`
	Name    string   `json:"name"`
	Members []string `json:"members"`
}

func GetRooms(w http.ResponseWriter, r *http.Request) {
	var res []RoomsRes

	for _, r := range rooms {
		fmt.Println(r.clients)
		res = append(res, RoomsRes{r.id, r.name, make([]string, 0)})
		for member := range r.clients {
			fmt.Println(member.name)
			res[len(res)-1].Members = append(res[len(res)-1].Members, member.name)
		}
	}

	JsonResponse(w, res, 200)
}

func CreateRoom(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	password := r.URL.Query().Get("password")

	if name == "" || password == "" {
		JsonResponse(w, map[string]string{"error": "Room must have a name and a password"}, 400)
		return
	}

	room := newRoom(name, password)
	rooms[room.id] = room

	JsonResponse(w, map[string]string{"message": "Room '" + name + "' has been created successfully", "roomId": room.id}, 201)
	go room.run()

}

func JoinRoom(w http.ResponseWriter, r *http.Request) {
	roomId := r.URL.Query().Get("id")
	roomPassword := r.URL.Query().Get("password")
	memberName := r.URL.Query().Get("memberName")

	room, ok := rooms[roomId]

	if !ok || room.password != roomPassword {
		JsonResponse(w, map[string]string{"error": "Wrong password or room id"}, http.StatusForbidden)
		return
	}

	serveWs(room, memberName, w, r)
}
