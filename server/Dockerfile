FROM golang:1.19 AS builder
WORKDIR /app
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY server .
RUN CGO_ENABLED=0 GOOS=linux go build -o /chat-app

FROM alpine:latest
WORKDIR /app
COPY --from=builder /chat-app .
EXPOSE 8080
CMD ["./chat-app"]