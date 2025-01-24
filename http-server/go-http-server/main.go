package main

import (
	"log"
	"net/http"
)

type api struct {
	addr string
}

func main() {

	api := &api{
		addr: ":8000",
	}

	mux := defaultServer()

	server := http.Server{
		Addr:    api.addr,
		Handler: mux,
	}

	mux.HandleFunc("GET /user", api.getUser)
	mux.HandleFunc("POST /user", api.createUser)
	mux.HandleFunc("GET /user/{id}", api.getUserById)
	mux.HandleFunc("DELETE /user/{id}", api.deleteUser)
	mux.HandleFunc("PATCH /user/{id}", api.updateUser)

	err := server.ListenAndServe()

	if err != nil {
		log.Fatal(http.ErrBodyReadAfterClose)
	}

}

func defaultServer() *http.ServeMux {
	mux := http.NewServeMux()
	return mux
}
