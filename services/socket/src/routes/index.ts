import { Router } from "../services/socket/router";
import { helloRouter } from "./root/hello/router";
import { addUserRouter } from "./root/userAdd/router";
import { checkRoomRouter } from "./root/room/router";
import { getUserRouter } from "./root/userGetAll/router";
import { userLeave } from "./root/userLeave/router";
import { messageAdd } from "./root/messageAdd/router";
import { messageGet } from "./root/messageGet/router";

const router = new Router();

router.addRouter("hello", helloRouter);
router.addRouter("user", addUserRouter);
router.addRouter("check", checkRoomRouter);
router.addRouter("user", getUserRouter);
router.addRouter("user", userLeave);
router.addRouter("message", messageAdd);
router.addRouter("message", messageGet);

export const rootRouter = router;
