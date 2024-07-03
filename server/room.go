package main

import "fmt"

type Room struct {
	id         string
	name       string
	password   string
	clients    map[*Client]bool
	broadcast  chan Message
	register   chan *Client
	unregister chan *Client
}

var rooms = make(map[string]*Room)

func newRoom(name string, pwd string) *Room {
	return &Room{
		id:         GenerateId(5),
		name:       name,
		password:   pwd,
		broadcast:  make(chan Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (r *Room) run() {
	for {
		select {
		case client := <-r.register:
			r.clients[client] = true
			fmt.Println(r.clients)
		case client := <-r.unregister:
			if _, ok := r.clients[client]; ok {
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
