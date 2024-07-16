package router

import (
	"chat-app/middleware"
	"chat-app/ws"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var r = mux.NewRouter()

func InitRouter(wsHandler *ws.Handler) {
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is running"))
	})
	r.HandleFunc("/room/{roomId}", wsHandler.GetRoomById).Methods("GET")
	r.HandleFunc("/rooms", wsHandler.GetRooms).Methods("GET")
	// ?name={}
	r.HandleFunc("/rooms", wsHandler.CreateRoom).Methods("POST")
	// ?username={}
	r.HandleFunc("/ws/{roomId}", wsHandler.JoinRoom)

	http.Handle("/", r)
}

func Run() {
	r.Use(middleware.CorsMiddleware)
	r.Use(middleware.LoggerMiddleware)

	var addr = flag.String("addr", ":8080", "http service address")

	flag.Parse()
	fmt.Println("Server is running on", *addr)
	err := http.ListenAndServe(*addr, r)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
