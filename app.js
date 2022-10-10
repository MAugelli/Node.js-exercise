const { createServer } = require ("node:http")

function createApp() {
    return createServer((request, response) =>{
        response.statusCode = 200
        response.setHeader ("Content-type", "application/json")
        const jsonResponseBody = JSON.stringify({ location: "Earth"})
        response.end(jsonResponseBody)
    })
}

module.exports=createApp
