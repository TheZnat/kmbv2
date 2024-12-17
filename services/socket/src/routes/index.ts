import { Router } from "../services/socket/router";
import { helloRouter } from "./root/hello/router";
import { addUserRouter } from "./root/user/router";
import { checkRoomRouter } from "./root/room/router";

const router = new Router();

router.addRouter("hello", helloRouter);
router.addRouter("user", addUserRouter);
router.addRouter("check", checkRoomRouter);

export const rootRouter = router;
