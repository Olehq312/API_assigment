import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';




export function setUpSwagger(app: Application){

    const swaggerDefinition = {
        openapi: '3.0.0',

        info: { title : 'Ducks API', 
            version: '1.0.0', 
            description: 'API for Ducks CRUD operations' 
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Duck: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        age: { type: 'number' },
                        color: { type: 'string' },
                        style: { type: 'string' },
                        _createdby: { type: 'string' },
                        likes: { type: 'number' } 
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: {type: 'string'} ,
                        email: {type: 'string'} ,
                        password: {type: 'string'}, 
                        registerDate: {type: 'string'}
                    },
                },
            },
        },
    }
    const options = {
        swaggerDefinition,
        // Path to the files containing OpenAPI definitions
        apis: ['**/*.ts']
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}
