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

type Message struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Content  string `json:"content"`
	RoomId   string `json:"roomId"`
}

func (c *Client) readPump(hub *Hub) {
	defer func() {
		hub.Unregister <- c
		hub.Broadcast <- Message{Type: "leave", Username: c.Name, Content: "left.", RoomId: c.Room.Id}
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
		hub.Broadcast <- message
	}
}

func (c *Client) writePump() {
	defer func() {
		c.conn.Close()
	}()

	for {
		msg, ok := <-c.send
		if !ok {
			return
		}

		c.conn.WriteJSON(msg)
	}
}
