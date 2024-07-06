package handlers

import (
	"chat-app/utils"
	"chat-app/ws"
	"net/http"
)

type RoomsRes struct {
	Id      string   `json:"id"`
	Name    string   `json:"name"`
	Members []string `json:"members"`
}

func GetRooms(w http.ResponseWriter, r *http.Request) {
	var res []RoomsRes

	for _, r := range ws.Rooms {
		res = append(res, RoomsRes{r.Id, r.Name, make([]string, 0)})
		for member := range r.Clients {
			res[len(res)-1].Members = append(res[len(res)-1].Members, member.Name)
		}
	}

	utils.JsonResponse(w, res, 200)
}

func CreateRoom(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	password := r.URL.Query().Get("password")

	if name == "" || password == "" {
		utils.JsonResponse(w, map[string]string{"error": "Room must have a name and a password"}, 400)
		return
	}

	room := ws.NewRoom(name, password)
	ws.Rooms[room.Id] = room

	utils.JsonResponse(w, map[string]string{"message": "Room '" + name + "' has been created successfully", "roomId": room.Id}, 201)
	go room.Run()

}

func JoinRoom(w http.ResponseWriter, r *http.Request) {
	roomId := r.URL.Query().Get("id")
	roomPassword := r.URL.Query().Get("password")
	memberName := r.URL.Query().Get("memberName")

	room, ok := ws.Rooms[roomId]

	if !ok || room.Password != roomPassword {
		utils.JsonResponse(w, map[string]string{"error": "Wrong password or room id"}, http.StatusForbidden)
		return
	}

	ws.ServeWs(room, memberName, w, r)
}
