import { Router } from "../../../services/socket/router";
import * as controller from "./controller";

const router = new Router();

router.addRoute({ path: "get" }, controller.userGet);

export const getUserRouter = router;
