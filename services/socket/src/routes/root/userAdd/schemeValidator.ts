import Joi from "joi";
import { schemeValidator } from "../../../services/socket/schemeValidator";
import { name } from "../../../services/hello/schemeValidator";

export const userAdd = schemeValidator(
    Joi.object({
        name: name().required(),
    })
);
