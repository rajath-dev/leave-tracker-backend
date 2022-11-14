import { Router } from "express";
import { sendEmailInvite } from "../controllers/invite.controller";

const inviteRouter = Router();

inviteRouter.post('/invite', sendEmailInvite);

export default inviteRouter;