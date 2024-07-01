package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Client struct {
	room *Room
	conn *websocket.Conn
	send chan Message
}

func (c *Client) readPump() {
	defer func() {
		c.room.unregister <- c
		c.conn.Close()
	}()

	for {
		var message Message
		err := c.conn.ReadJSON(&message)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		c.room.broadcast <- message
	}
}

func (c *Client) writePump() {
	defer func() {
		c.room.unregister <- c
		c.conn.Close()
	}()

	for {
		msg, ok := <-c.send
		if !ok {
			return
		}

		err := c.conn.WriteJSON(msg)
		if err != nil {
			log.Println("error writing message:", err)
			break
		}
	}
}

func serveWs(room *Room, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{room: room, conn: conn, send: make(chan Message)}
	client.room.register <- client

	go client.writePump()
	go client.readPump()
}
