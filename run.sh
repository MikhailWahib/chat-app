#!/bin/bash

# Function to run client
run_client() {
    echo "Starting client..."
    # Navigate to the /client dir
    cd ~/chat-app/client
    pnpm i
    pnpm run dev &
    CLIENT_PID=$!
}

# Function to run server
run_server() {
    echo "Starting server..."
    cd ~/chat-app/server
    go run *.go &
    SERVER_PID=$!
}

# Function to stop all processes
stop_all() {
    echo "Stopping all processes..."
    kill $CLIENT_PID $SERVER_PID
    exit
}

# Set up trap to catch SIGINT (Ctrl+C) and stop all processes
trap stop_all SIGINT

# Run client and server
run_client
run_server

# Wait for processes to finish
wait $CLIENT_PID $SERVER_PID
