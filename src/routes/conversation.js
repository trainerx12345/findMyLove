import { Router } from 'express';

import Conversation from '../models/Conversations.js';
import DatabaseError from "../models/error.js";

const router = Router();

router.post("", async (request, response) => {
  const {data } = request.body;
  try {
    const newConversation = new Conversation(data)
    await newConversation.save();
    response.status(201).json(newConversation);
  } catch (error) {
    response.status(400).json({ error });
  }
  finally {
    throw new DatabaseError();
  }
});

router.get("", async (request, response) => {
  try {
    const results = await Conversation.find();
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
    const results = await Conversation.findOne({ _id: request.params.id }).exec();
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
      const obj = await Conversation.findOneAndUpdate({ _id: request.params.id }, request.body, {
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
    const success = await Conversation.deleteOne({_id:request.params.id}).exec();
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