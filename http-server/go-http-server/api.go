package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

var users = []User{}

func (s *api) getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (s *api) createUser(w http.ResponseWriter, r *http.Request) {
	var payload User
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u := User{
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
	}

	err = validateUser(u, users)
	if err != nil {
		return
	}

	users = append(users, u)
	w.WriteHeader(http.StatusCreated)
}

func (s *api) getUserById(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi((getId(r.URL.Path)))

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if id < 0 || id >= len(users) {
		http.Error(w, "invalid user ID", http.StatusBadRequest)
		return
	}

	err = json.NewEncoder(w).Encode(users[id])

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (s *api) deleteUser(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi((getId(r.URL.Path)))

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if id < 0 || id >= len(users) {
		http.Error(w, "invalid user ID", http.StatusBadRequest)
		return
	}

	users = append(users[:id], users[id+1:]...)

	err = json.NewEncoder(w).Encode(users)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)

}

func (s *api) updateUser(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi((getId(r.URL.Path)))

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if id < 0 || id >= len(users) {
		http.Error(w, "invalid user ID", http.StatusBadRequest)
		return
	}
	var payload User

	err = json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newUser := User{
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
	}
	if newUser.FirstName == "" {
		newUser.FirstName = users[id].FirstName
	}
	if newUser.LastName == "" {
		newUser.LastName = users[id].LastName
	}

	users[id] = newUser

	w.WriteHeader(http.StatusOK)
}

func getId(path string) string {
	return strings.Split(path, "/")[2]
}
