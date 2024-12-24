import { Router } from "../../../services/socket/router";
import { userAdd } from "../userAdd/controller";
import { userGet } from "../userGetAll/controller";
import { userLeave } from "../userLeave/controller";
import * as schemeValidator from "./schemeValidator";

const router = new Router();

router.addRoute({ path: "add" }, schemeValidator.userAdd, userAdd);
router.addRoute({ path: "getAll" }, userGet);
router.addRoute({ path: "leave" }, userLeave);

export const userRouter = router;
