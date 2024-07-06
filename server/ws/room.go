package ws

import "chat-app/utils"

type Room struct {
	Id         string
	Name       string
	Password   string
	Clients    map[*Client]bool
	Broadcast  chan Message
	Register   chan *Client
	Unregister chan *Client
}

type Message struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Content  string `json:"message"`
}

var Rooms = make(map[string]*Room)

func NewRoom(name string, pwd string) *Room {
	return &Room{
		Id:         utils.GenerateId(5),
		Name:       name,
		Password:   pwd,
		Broadcast:  make(chan Message),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
	}
}

func (r *Room) Run() {
	for {
		select {
		case client := <-r.Register:
			r.Clients[client] = true
			for c := range r.Clients {
				c.send <- Message{Type: "join", Username: client.Name, Content: client.Name + " joined the room"}
			}
		case client := <-r.Unregister:
			if _, ok := r.Clients[client]; ok {
				delete(r.Clients, client)
				close(client.send)
			}
		case message := <-r.Broadcast:
			for client := range r.Clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(r.Clients, client)
				}
			}
		}
	}
}
