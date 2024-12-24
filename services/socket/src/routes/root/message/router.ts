import { Router } from "../../../services/socket/router";
import { messageAdd } from "../messageAdd/controller";
import { messageGet } from "../messageGet/controller";

const router = new Router();

router.addRoute({ path: "add" }, messageAdd);
router.addRoute({ path: "get" }, messageGet);

export const messageRouter = router;
