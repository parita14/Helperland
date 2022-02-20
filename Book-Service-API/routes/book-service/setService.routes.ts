import express from "express";
import { celebrate } from "celebrate";

import { ServiceRepository } from "../../book-service/setup-service/setService.repository";
import { ServiceSchema } from "../../book-service/setup-service/setService.models";
import { ServiceService } from "../../book-service/setup-service/setService.service";
import { ServiceController } from "../../book-service/setup-service/setService.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { zipAdd } = ServiceSchema;
const serviceRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: ServiceRepository = new ServiceRepository();
const service: ServiceService = new ServiceService(repo);
const controller: ServiceController = new ServiceController(service);

serviceRouter.post('/set-service', celebrate(zipAdd), loginController.validateToken, controller.setService);

export = serviceRouter;