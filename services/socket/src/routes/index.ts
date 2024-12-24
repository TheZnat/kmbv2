import { Router } from "../services/socket/router";
import { checkRoomRouter } from "./root/room/router";
import {userRouter} from './root/user/router'
import {messageRouter} from './root/message/router'

const router = new Router();

router.addRouter("check", checkRoomRouter);
router.addRouter("user", userRouter);
router.addRouter("message", messageRouter);

export const rootRouter = router;
