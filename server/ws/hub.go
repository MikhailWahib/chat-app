package ws

type Room struct {
	Id      string
	Name    string
	Clients map[*Client]bool
}

type Hub struct {
	Rooms      map[string]*Room
	Broadcast  chan Message
	Register   chan *Client
	Unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan Message),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			if _, ok := h.Rooms[client.Room.Id]; ok {
				r := h.Rooms[client.Room.Id]

				if _, ok := r.Clients[client]; !ok {
					r.Clients[client] = true
				}
			}

		case client := <-h.Unregister:
			if _, ok := h.Rooms[client.Room.Id]; ok {
				if _, ok := h.Rooms[client.Room.Id].Clients[client]; ok {
					delete(h.Rooms[client.Room.Id].Clients, client)
					close(client.send)
				}
			}

		case msg := <-h.Broadcast:
			if _, ok := h.Rooms[msg.RoomId]; ok {

				for client := range h.Rooms[msg.RoomId].Clients {
					client.send <- msg
				}
			}
		}
	}
}
