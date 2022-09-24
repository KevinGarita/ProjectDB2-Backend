const config = require('../config/env.config');
const path = require('path');

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Title",
            description: "Description",
            version: "1.0.0"
        },
        servers: [
            {
                url: config.server.URL
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            parameters: {
                identifier: {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "The schema(table) identifier",
                },
                offsetPagination: {
                    in: "query",
                    name: "page",
                    required: false,
                    description: "The number of items to skip before starting to collect the result set (min:0)",
                    schema: {
                        type: "integer",
                        minimum: 0,
                        //default: 0,
                    }
                },
                limitPagination: {
                    in: "query",
                    name: "limit",
                    required: false,
                    description: "The number of items to return (min: 1, max: 50)",
                    schema: {
                        type: "integer",
                        minimum: 1,
                        maximum: 50,
                        //default: 10,
                    }
                }
            },
            responses: {
                Pagination: {
                    code: "200",
                    description: "The request succeeded.",
                    content: {
                        "application/json": {
                            example: {
                                count: "Total number of existing resources",
                                rows: "List with returned resources"
                            }
                        }
                    }
                },
                Created: {
                    code: "201",
                    description: "The request succeeded, and a new resource was created as a result.",
                    content: {
                        "text/plain": {
                            schema: {
                                type: "string",
                                example: "Created"
                            }
                        }
                    }
                },
                No_Content: {
                    code: "204",
                    description: "The resource was deleted successfully.",
                },
                Bad_Request: {
                    code: "400",
                    description: "The server could not understand the request due to invalid syntax, returns a message with the cause.",
        
                },
                Unauthorized: {
                    code: "401",
                    description: "Authorization information is missing, expired, or invalid, returns a message with the cause.",
     
                },
                Forbidden: {
                    code: "403",
                    description: "The client does not have access rights to the content; that is, it is not authorized, returns a message with the cause.",
      
                },
                Not_Found: {
                    code: "404",
                    description: "The specified resource was not found, returns a message with the cause.",
      
                },
                Conflict: {
                    code: "409",
                    description: "The request conflicts with the current state of the server, returns a message with the cause.",
       
                },
                Locked: {
                    code: "423",
                    description: "The resource that is being accessed is locked, returns a message with the cause.",
       
                },
                Unexpected: {
                    code: "5XX",
                    description: "Unexpected error.",
                    content: {
                        "application/json": {
                            example: {
                                message: "A message with the cause",
                                error: "Error message"
                            }
                        }
                    }
                },
            }
        }
    },
    apis: [`${path.join(__dirname, "../routes/*.routes.js")}`, `${path.join(__dirname, "../router.js")}`] //Todas las rutas que quiero documentar
}

module.exports = swaggerSpec;