import { Router } from 'express';

import InterestedInRelationship from '../models/InterestedInRelationship.js';
import DatabaseError from "../models/error.js";

const router = Router();

router.post("", async (request, response) => {
  try {
    const newInterestedInRelationship = new InterestedInRelationship(data)
    await newInterestedInRelationship.save();
    response.status(201).json(newInterestedInRelationship);
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

router.get("", async (request, response) => {
  try {
    const results = await InterestedInRelationship.find();
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
      const results = await InterestedInRelationship.findOne({ _id: request.params.id }).exec();
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
      const obj = await InterestedInRelationship.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
        upsert: false,
      });
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
router.delete("/:id", async (request, response) => {
  try {
    const success = await InterestedInRelationship.deleteOne({ _id: request.params.id }).exec();
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