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
 *       - Authentication
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

/**
 * @swagger
* /user/login:
*   post:
*     tags:
*       - Authentication
*     summary: User login
*     description: Authenticates a user and returns a token
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: User's email
*               password:
*                 type: string
*                 description: User's password
*     responses:
*       200:
*         description: Successfully authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 token:
*                   type: string
*       401:
*         description: Invalid credentials
*/
router.post('/user/login', loginUser);



// New routes


/**
 * @swagger
 * 
 *
 * /ducks/random:
 *   get:
 *     tags:
 *       - Special Duck Routes
 *     summary: Get a random duck
 *     description: Fetches a random duck from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved a random duck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 *       404:
 *         description: No ducks available
 *
*/
router.get('/ducks/random', getRandomDuck);

/**
 * @swagger
 *   /ducks/{id}/like:
 *   post:
 *     tags:
 *       - Special Duck Routes
 *     summary: Like a duck
 *     description: Allows a user to like a duck. Requires authentication.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the duck to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Duck liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Duck not found
 *       401:
 *         description: Unauthorized
 */
router.post('/ducks/:id/like', securityToken, likeDuck);

// Ducks CRUD

/**
 * @swagger
 * /ducks:
 *   get:
 *     tags:
 *       - Duck Routes
 *     summary: Get all ducks
 *     description: Fetches all ducks from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved all ducks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Duck"
 */
router.get('/ducks', getAllDucks);

/**
 * @swagger
 *
 * /ducks/{id}:
 *   get:
 *     tags:
 *       - Duck Routes
 *     summary: Get a duck by ID
 *     description: Fetches a specific duck by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the duck to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the duck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 *       404:
 *         description: Duck not found
 */
router.get('/ducks/:id', getDucksbyId);


// Security Token


// create 
/**
 * @swagger
 * /ducks:
 *   post:
 *     tags:
 *       - Duck Routes
 *     summary: Creates a specific Duck 
 *     description: Creates a specific Duck based on its id
 *     security:
 *       - ApiKeyAuth: []
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
 *         description: Duck created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 */

router.post('/ducks', securityToken, createDuck);



// update 
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
 *         description: Duck updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 */
router.put('/ducks/:id', securityToken,  updateDucksById);

//    delete:
/**
* @swagger
* /ducks/{id}:
*   delete:
 *     tags:
*       - Duck Routes
*     summary: Delete a duck by ID (Requires Authentication)
*     description: Deletes a specific duck by its unique ID. Requires authentication.
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the duck to delete
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successfully deleted the duck
*       404:
*         description: Duck not found
*       401:
*         description: Unauthorized
*/
router.delete('/ducks/:id', securityToken,  deleteDucksById);

export default router;