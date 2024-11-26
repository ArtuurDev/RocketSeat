import { Database } from "../../database/database.js"
import { buildRoutePath } from "../utils/buildRoutePath.js"

const database = new Database()
export const routes = [

    {
        method: "POST",
        path: buildRoutePath('/users'),
        handler: ((req, res) => {
            const {name, email} = req.body
        
            const users = {
            id: crypto.randomUUID(),
            name,
            email
        }
        database.insert('users', users)
        return res.writeHead(201).end()
        })
        
    },
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: ((req,res) => {
            const {search} = req.query
            console.log(req.query)

            const data = database.select('users', search ? {
                name: search,
                email: search
            }: null)
            return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(data))
        })
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: ((req, res)=> {
            const {id} = req.params

            database.delete('users', id)
            return res.writeHead(204).end()

        })
    }, {
        method: "PUT",
        path: buildRoutePath('/users/:id'),
        handler: ((req, res) => {
            const {id} = req.params
            const {name, email} = req.body
            database.update('users', id, {
                name,
                email
            })

            return res.writeHead(204).end()

        })
    }

]