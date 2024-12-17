import { Router } from "../../../services/socket/router";
import * as controller from "./controller";

const router = new Router();

router.addRoute({ path: "room" }, controller.checkRoom);

export const checkRoomRouter = router;
