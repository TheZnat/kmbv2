import { Router } from "../../../services/socket/router";
import * as controller from "./controller";

const router = new Router();

router.addRoute({ path: "add" }, controller.messageAdd);

export const messageAdd = router;
