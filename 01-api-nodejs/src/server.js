import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from '../database/database.js'

const database = new Database()

const server = http.createServer(async(req, res) => {

    const {method, url} = req

    await json(req, res)

    if (method === "GET" && url === "/tasks") {
        const data = database.select('users')
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(data))
    }
    
    if (method === "POST" && url === "/tasks") {
        const {name, email} = req.body
        
        const users = {
            id: crypto.randomUUID(),
            name,
            email
        }
        database.insert('users', users)
    }
    
    return res
    .setHeader('Content-type','application/json')
    .writeHead(201).end()
})

server.listen(3000, () => {
    console.log('servidor rodando')
})