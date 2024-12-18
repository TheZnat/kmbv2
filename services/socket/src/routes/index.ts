import { Router } from "../services/socket/router";
import { helloRouter } from "./root/hello/router";
import { addUserRouter } from "./root/userAdd/router";
import { checkRoomRouter } from "./root/room/router";
import { getUserRouter } from "./root/userGet/router";

const router = new Router();

router.addRouter("hello", helloRouter);
router.addRouter("user", addUserRouter);
router.addRouter("check", checkRoomRouter);
router.addRouter("user", getUserRouter);

export const rootRouter = router;
