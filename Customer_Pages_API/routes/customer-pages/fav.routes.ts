import express from "express";

import { FavRepository } from "../../customer-pages/favourite-pros/fav.repository";
import { FavService } from "../../customer-pages/favourite-pros/fav.service";
import { FavController } from "../../customer-pages/favourite-pros/fav.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const favRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: FavRepository = new FavRepository();
const service: FavService = new FavService(repo);
const controller: FavController = new FavController(service);

favRouter.post('/create-favorite-pros/:spId', loginController.validateToken, controller.FavSP, controller.removeFavSp);

favRouter.get('/get-all-pros', loginController.validateToken, controller.SPworkedwithCustomer);

favRouter.post('/create-blocked-pros/:spId', loginController.validateToken, controller.blockSP, controller.removeBlockedSp);

export = favRouter;