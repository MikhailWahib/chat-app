package handler

import (
	"chat-app/router"
	"chat-app/ws"
)

func main() {
	h := ws.NewHub()
	wsHandler := ws.NewHandler(h)
	go h.Run()

	router.InitRouter(wsHandler)
	router.Run()
}
