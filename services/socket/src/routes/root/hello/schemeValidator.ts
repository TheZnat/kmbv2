import Joi from 'joi';
import { schemeValidator } from '../../../services/socket/schemeValidator';
import { name } from '../../../services/hello/schemeValidator';

export const world = schemeValidator(Joi.object({
    name: name().required(),
}));
