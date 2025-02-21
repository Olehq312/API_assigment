import { Request, Response } from "express";
import { duckModel } from "../models/ducksModel";
import { connect, disconnect } from "../repos/db";

// CRUD operations for ducks

/* 
 @param req
 @param res
*/
export async function createDuck(req: Request, res: Response): Promise<void> {
  
    const data = req.body;

  try {
    await connect();
    const duck = new duckModel(data);
    const result = await duck.save();

    res.status(201).send(duck);

  } 
  catch (error) { 
    res.status(500).send('Error creating duck' + error);

  } 
  finally {
    await disconnect();
  }
}  



// Get all ducks
export async function getAllDucks(req: Request, res: Response): Promise<void> {
  
  try {
    await connect();
   
    const result = await duckModel.find({});
    res.status(200).send(result);


  } 
  catch (error) { 
    res.status(500).send('Error seeing ducks' + error);

  } 
  finally {
    await disconnect();
  }
}  




// Get all ducks by ID
export async function getDucksbyId(req: Request, res: Response): Promise<void> {
  
    try {
      await connect();
     

      const id = req.params.id;
      const result = await duckModel.find({ _id: id });
      res.status(200).send(result);
  
  
    } 
    catch (error) { 
      res.status(500).send('Error seeing ducks by ID' + error);
  
    } 
    finally {
      await disconnect();
    }
  }  






// Update ducks by ID
export async function updateDucksById(req: Request, res: Response): Promise<void> {
  
    const id = req.params.id;

    try {
      await connect();
     
      const result = await duckModel.findByIdAndUpdate(id, req.body);

      if (!result) {
        res.status(404).send('Duck not found' + id);
      }

      else
        {
            res.status(200).send('Duck updated successfully');
        }

    } 
    catch (error) { 
      res.status(500).send('Error finding and updating duck by ID' + error);
  
    } 
    finally {
      await disconnect();
    }
  }  



  // Delete ducks by ID
export async function deleteDucksById(req: Request, res: Response): Promise<void> {
  
    const id = req.params.id;

    try {
      await connect();
     
      const result = await duckModel.findByIdAndDelete(id);

      if (!result) {
        res.status(404).send('Duck not found' + id);
      }

      else
        {
            res.status(200).send('Duck deleted successfully');
        }

    } 
    catch (error) { 
      res.status(500).send('Error deleting duck by ID' + error);
  
    } 
    finally {
      await disconnect();
    }
  }  




  // Random Duck

  // Get a random duck
  export async function getRandomDuck(req: Request, res: Response): Promise<void> {
    try {
      await connect();
  
      const count = await duckModel.countDocuments(); // Get the total number of ducks
      if (count === 0) {
        res.status(404).send("No ducks found in the database.");
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * count);
      const randomDuck = await duckModel.findOne().skip(randomIndex); // Fetch a random duck
  
      if (!randomDuck) {
        res.status(404).send("No duck found.");
        return;
      }
  
      res.status(200).json(randomDuck);
    } catch (error) {
      res.status(500).send("Error fetching random duck: " + error);
    } finally {
      await disconnect();
    }
  }
  
