import { Router } from 'express';

import {handle404,handleError} from '../errors.js';

import userRouter from "./user.js";
import genderRouter from "./gender.js";
import interestedInGenderRouter from "./interestedingender.js";
import gradeRouter from "./grade.js";
import blockRouter from "./block.js";
import userPhotoRouter from "./userphoto.js";
import interestedInRelationshipRouter from "./interestedinrelationship.js";
import relationshipTypeRouter from "./relationshiptype.js";
import conversationRouter from "./conversation.js";
import participantRouter from "./participant.js";
import messageRouter from "./message.js";
import authRouter from './auth.js'

import urls from "../urls.js";

const router = Router();


// CRUD API
router.use(urls.apiPrefix + urls.auth.path, authRouter);
router.use(urls.apiPrefix + urls.user.path, userRouter);
router.use(urls.apiPrefix + urls.gender.path, genderRouter);
router.use(
  urls.apiPrefix + urls.interestedInGender.path,
  interestedInGenderRouter
);
router.use(urls.apiPrefix + urls.grade.path, gradeRouter);
router.use(urls.apiPrefix + urls.block.path, blockRouter);
router.use(urls.apiPrefix + urls.userPhoto.path, userPhotoRouter);
router.use(
  urls.apiPrefix + urls.interestedInRelationship.path,
  interestedInRelationshipRouter
);
router.use(urls.apiPrefix + urls.relationshipType.path, relationshipTypeRouter);
router.use(urls.apiPrefix + urls.conversation.path, conversationRouter);
router.use(urls.apiPrefix + urls.participant.path, participantRouter);
router.use(urls.apiPrefix + urls.message.path, messageRouter);

// Error handlers
router.use(handle404);
router.use(handleError);

export default router;