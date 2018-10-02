import { express } from 'express';
import { chain, info, block, getBlock } from './controllers';

const routes = express.Router();

routes.get('/chain', chain);

routes.get('/info', info);

routes.get('/block/:height', getBlock);

routes.post('/block', block);

module.exports = routes;