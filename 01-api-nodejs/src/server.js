import http from 'node:http'


const users = []

const server = http.createServer((req, res) => {

    const {method, url} = req

    if (method === "GET" && url === "/tasks") {
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === "POST" && url === "/tasks") {
        
        users.push({
            id: crypto.randomUUID(),
            name: 'artur'
        })
    }
    
    return res
    .setHeader('Content-type','application/json')
    .writeHead(201).end(JSON.stringify(users))
})

server.listen(3000, () => {
    console.log('servidor rodando')
})