import { Router } from 'express';

import User from  "../models/users.js"
import DatabaseError from "../models/error.js";

const router = Router();

router.post("", async (request, response) => {
  try {
    const newUser = new User(request.body)
    await newUser.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

router.get("", async (request, response) => {
  try {
    const results = await User.find();
    response.json(results);
  } catch (error) {

    response.status(400).json({ error });

  }
  finally {
    throw new DatabaseError();
  }
});


router.get(
  "/:id", 
  async (request, response) => {
  try {
    const results = await User.findOne({ _id: request.params.id} ).exec();
    response.json(results);
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

router.get(
  "/gender_interest/:gender_interest", 
  async (request, response) => {
  try {
    const results = await User.find({ gender_identity: request.params.gender_interest} ).exec();
    response.json(results);
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

router.put(
  "/:id",
  async (request, response) => {
    try {
      const obj = await User.findOneAndUpdate({ _id: request.params.id }, request.body );

      if (obj) {
        response.status(200).json(obj);
      } else {
        response.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      response.status(400).json({ error });
    }
    finally {
      throw new DatabaseError();
    }
  }
);
router.put(
  "/:id/matches/:matchid",
  async (request,response)=>{
   await User.updateOne(
      {_id:request.params.id},
      {$push:{matches:request.params.matchid}}
      )
      .then(result =>{
        if( result.modifiedCount  === 1 ){
          response.json(result);
      }  
    })
  }

)


router.delete("/:id", async (request, response) => {
  try {
    const success = await User.deleteOne({_id:request.params.id}).exec();
    if (success) {
      response.status(204).send();
    } else {
      response.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

export default router;