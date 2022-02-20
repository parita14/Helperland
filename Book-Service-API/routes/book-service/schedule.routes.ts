import express from "express";
import { celebrate } from "celebrate";
import { ScheduleRepository } from "../../book-service/create service/schedule.repository";
import { ServiceRequestSchema } from "../../book-service/create service/schedule.model";
import { ScheduleService } from "../../book-service/create service/schedule.service";
import { ScheduleController } from "../../book-service/create service/schedule.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { serviceAdd } = ServiceRequestSchema;

const scheduleRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: ScheduleRepository = new ScheduleRepository();
const service: ScheduleService = new ScheduleService(repo);
const controller: ScheduleController = new ScheduleController(service);

scheduleRouter.post('/schedule-plan', loginController.validateToken, controller.decodeToken, controller.createService);

export = scheduleRouter;