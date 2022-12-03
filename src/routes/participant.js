import { Router } from 'express';

import Participant from '../models/Participants.js';
import DatabaseError from "../models/error.js";

const router = Router();

router.post("", async (request, response) => {
  const { data } = request.body;
  try {
    const newParticipant = new Participant(data)
    await newParticipant.save();
    response.status(201).json(newParticipant);
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

router.get("", async (request, response) => {
  try {
    const results = await Participant.find();
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
      const results = await Participant.findOne({ _id: request.params.id }).exec();
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
      const obj = await Participant.findOneAndUpdate({ _id: request.params.id }, request.body, {
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
    const success = await Participant.deleteOne({ _id: request.params.id }).exec();
    if (success) {
      respond.status(204).send();
    } else {
      respond.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

export default router;