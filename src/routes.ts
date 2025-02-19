import { Router, Request, Response } from 'express';
import {
    createDuck, 
    getAllDucks,
    getDucksbyId,
    updateDucksById,
    deleteDucksById } from './controllers/duckController';


const router: Router = Router();


router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the API_Ducks_WORLD');
});



router.post('/ducks', createDuck);
router.get('/ducks', getAllDucks);
router.get('/ducks/:id', getDucksbyId);
router.put('/ducks/:id', updateDucksById);
router.delete('/ducks/:id', deleteDucksById);

export default router;