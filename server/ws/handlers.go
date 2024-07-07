package ws

import (
	"chat-app/utils"
	"net/http"

	"github.com/gorilla/mux"
)

type RoomsRes struct {
	Id      string   `json:"id"`
	Name    string   `json:"name"`
	Members []string `json:"members"`
}

type Handler struct {
	hub *Hub
}

func NewHandler(h *Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

func (h *Handler) GetRooms(w http.ResponseWriter, r *http.Request) {
	var res []RoomsRes = make([]RoomsRes, 0)

	for _, r := range h.hub.Rooms {
		res = append(res, RoomsRes{r.Id, r.Name, make([]string, 0)})
		for member := range r.Clients {
			res[len(res)-1].Members = append(res[len(res)-1].Members, member.Name)
		}
	}

	utils.JsonResponse(w, res, 200)
}

func (h *Handler) CreateRoom(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")

	if name == "" {
		utils.JsonResponse(w, map[string]string{"error": "Room must have a name and a password"}, 400)
		return
	}

	room := &Room{
		Id:      utils.GenerateId(5),
		Name:    name,
		Clients: make(map[*Client]bool),
	}
	h.hub.Rooms[room.Id] = room

	utils.JsonResponse(w, map[string]string{"message": "Room '" + name + "' has been created successfully", "roomId": room.Id}, 201)
}

func (h *Handler) JoinRoom(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		utils.JsonResponse(w, map[string]string{"error": err.Error()}, http.StatusBadRequest)
		return
	}

	roomId := mux.Vars(r)["roomId"]
	username := r.URL.Query().Get("username")

	room, ok := h.hub.Rooms[roomId]
	if !ok {
		utils.JsonResponse(w, map[string]string{"error": "Room with this ID not found"}, http.StatusNotFound)
		return
	}

	client := &Client{Name: username, Room: room, conn: conn, send: make(chan Message)}
	h.hub.Register <- client
	h.hub.Broadcast <- Message{Type: "join", Username: username, Content: "joined the room!", RoomId: roomId}

	go client.writePump()
	client.readPump(h.hub)
}
