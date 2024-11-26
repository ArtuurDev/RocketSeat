import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes/routes.js'
import { extractQueryParams } from './utils/extract-query.js'

const server = http.createServer(async(req, res) => {

    const {method, url} = req

    await json(req, res)

    const route = routes.find((route) => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const {query, ...params} = routeParams.groups
        
        req.params = params
        req.query = query ? extractQueryParams(query): {}
        console.log(req.params)
        return route.handler(req, res)
    }

    return res.end('page not found')
    
})

server.listen(3000, () => {
    console.log('servidor rodando')
})