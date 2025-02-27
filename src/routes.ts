import { Router, Request, Response } from 'express';
import {
    createDuck, 
    getAllDucks,
    getDucksbyId,
    updateDucksById,
    deleteDucksById,
    getRandomDuck,
    likeDuck } from './controllers/duckController';
import { loginUser, registerUser, securityToken } from './controllers/authController';




const router: Router = Router();


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Welcome to the API_Ducks_WORLD
 *     responses:
 *       200:
 *         description: Server up and running.
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the API_Ducks_WORLD');
});



// Authentication

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);



// New routes
router.get('/ducks/random', getRandomDuck);
router.post('/ducks/:id/like', securityToken, likeDuck);

// Ducks CRUD
router.get('/ducks', getAllDucks);
router.get('/ducks/:id', getDucksbyId);


// Security Token
router.post('/ducks', securityToken, createDuck);



// update + delete
/**
 * @swagger
 * /ducks/{id}:
 *   put:
 *     tags:
 *       - Duck Routes
 *     summary: Updates a specific Duck 
 *     description: Updates a specific Duck based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Duck"
 *
 *     responses:
 *       200:
 *         description: Product updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 */
router.put('/ducks/:id', securityToken,  updateDucksById);
router.delete('/ducks/:id', securityToken,  deleteDucksById);

export default router;