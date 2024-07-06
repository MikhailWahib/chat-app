package router

import (
	"chat-app/ws"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var r = mux.NewRouter()

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func InitRouter(wsHandler *ws.Handler) {
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is running"))
	})
	r.HandleFunc("/rooms", wsHandler.GetRooms).Methods("GET")
	// ?name={}&password={}
	r.HandleFunc("/rooms", wsHandler.CreateRoom).Methods("POST")
	// ?id={}&password={}&username={}
	r.HandleFunc("/ws", wsHandler.JoinRoom)

	http.Handle("/", r)
}

func Run() {
	corsHandler := corsMiddleware(r)

	var addr = flag.String("addr", ":8080", "http service address")

	flag.Parse()
	fmt.Println("Server is running on", *addr)
	err := http.ListenAndServe(*addr, corsHandler)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
