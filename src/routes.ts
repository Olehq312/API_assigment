import { Router, Request, Response } from 'express';
import {
    createDuck, 
    getAllDucks,
    getDucksbyId,
    updateDucksById,
    deleteDucksById } from './controllers/duckController';
import { loginUser, registerUser, securityToken } from './controllers/authController';



const router: Router = Router();


router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the API_Ducks_WORLD');
});



// Authentication
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);



// Ducks CRUD

router.get('/ducks', getAllDucks);
router.get('/ducks/:id', getDucksbyId);

// Security Token
router.post('/ducks', securityToken, createDuck);
router.put('/ducks/:id', securityToken,  updateDucksById);
router.delete('/ducks/:id', securityToken,  deleteDucksById);

export default router;