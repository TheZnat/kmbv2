import { Router } from "../../../services/socket/router";
import * as controller from "./controller";

const router = new Router();

router.addRoute({ path: "leave" }, controller.userLeave);

export const UserLeave = router;
