package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var addr = flag.String("addr", ":8080", "http service address")

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Server is running"))
	})

	r.HandleFunc("/rooms", GetRooms).Methods("GET")
	// ?name={}&password={}
	r.HandleFunc("/rooms", CreateRoom).Methods("POST")
	// ?id={}&password={}&memberName={}
	r.HandleFunc("/ws", JoinRoom)

	http.Handle("/", r)

	flag.Parse()
	fmt.Println("Server is running on", *addr)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
