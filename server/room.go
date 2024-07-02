package main

type Room struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	ClientsCount int    `json:"members"`
	password     string
	clients      map[*Client]bool
	broadcast    chan Message
	register     chan *Client
	unregister   chan *Client
}

func newRoom(name string, pwd string) *Room {
	return &Room{
		ID:           GenerateId(5),
		Name:         name,
		ClientsCount: 0,
		password:     pwd,
		broadcast:    make(chan Message),
		register:     make(chan *Client),
		unregister:   make(chan *Client),
		clients:      make(map[*Client]bool),
	}
}

func (r *Room) run() {
	for {
		select {
		case client := <-r.register:
			r.clients[client] = true
			r.ClientsCount += 1
		case client := <-r.unregister:
			if _, ok := r.clients[client]; ok {
				r.ClientsCount -= 1
				delete(r.clients, client)
				close(client.send)
			}
		case message := <-r.broadcast:
			for client := range r.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(r.clients, client)
				}
			}
		}
	}
}
