package main

import (
    "log"
    "net/http"
)

func main() {
    // Создаем файловый сервер, который раздает содержимое папки "static"
    fs := http.FileServer(http.Dir("static"))
    // Монтируем файловый сервер на корневой URL
    http.Handle("/", fs)

    log.Println("Сервер запущен на http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
