#!/bin/bash

# Get the current directory.
SCRIPT_DIR=$(dirname "$(realpath "$0")")

run_client() {
    echo "Starting client..."
    cd "$SCRIPT_DIR/client" || { echo "Failed to navigate to client directory"; exit 1; }
    pnpm install || { echo "Failed to install client dependencies"; exit 1; }
    pnpm run dev &
    CLIENT_PID=$!
    echo "Client running with PID $CLIENT_PID"
}

run_server() {
    echo "Starting server..."
    cd "$SCRIPT_DIR/server" || { echo "Failed to navigate to server directory"; exit 1; }
    go run *.go &
    SERVER_PID=$!
    echo "Server running with PID $SERVER_PID"
}

stop_all() {
    echo "Stopping all processes..."
    if [[ -n $CLIENT_PID ]]; then
        kill $CLIENT_PID 2>/dev/null && echo "Stopped client (PID $CLIENT_PID)"
    fi
    if [[ -n $SERVER_PID ]]; then
        kill $SERVER_PID 2>/dev/null && echo "Stopped server (PID $SERVER_PID)"
    fi
    exit
}

trap stop_all SIGINT

run_client
run_server

wait
