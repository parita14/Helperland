import express from "express";
import { celebrate } from "celebrate";

import { HistoryRepository } from "../../customer-pages/service-history/history.repository";
import { HistorySchema } from "../../customer-pages/service-history/history.model";
import { HistoryService } from "../../customer-pages/service-history/history.service";
import { HistoryController } from "../../customer-pages/service-history/history.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { ratingAdd } = HistorySchema;
const historyRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: HistoryRepository = new HistoryRepository();
const service: HistoryService = new HistoryService(repo);
const controller: HistoryController = new HistoryController(service);


historyRouter.get('/get-past-service-request', loginController.validateToken, controller.history);

historyRouter.get('/get-past-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);

historyRouter.post('/give-ratings/:ServiceRequestId', loginController.validateToken, celebrate(ratingAdd), controller.giveRatings);

historyRouter.get('/export', loginController.validateToken, controller.export);

export = historyRouter;