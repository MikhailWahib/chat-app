package ws

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Client struct {
	Name string
	Room *Room
	conn *websocket.Conn
	send chan Message
}

func (c *Client) readPump() {
	defer func() {
		c.Room.Unregister <- c
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
		c.Room.Broadcast <- message
	}
}

func (c *Client) writePump() {
	defer func() {
		c.Room.Unregister <- c
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

func ServeWs(room *Room, memberName string, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{Name: memberName, Room: room, conn: conn, send: make(chan Message)}
	client.Room.Register <- client

	go client.writePump()
	go client.readPump()
}
