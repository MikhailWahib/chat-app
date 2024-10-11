package main

import (
	"github.com/MikhailWahib/chat-app/api/router"
	"github.com/MikhailWahib/chat-app/ws"
)

func main() {
	h := ws.NewHub()
	wsHandler := ws.NewHandler(h)
	go h.Run()

	router.InitRouter(wsHandler)
	router.Run()
}
