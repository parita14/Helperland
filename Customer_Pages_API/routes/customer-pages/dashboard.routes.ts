import express from "express";
import { celebrate } from "celebrate";

import { DashboardRepository } from "../../customer-pages/dashboard/dashboard.repository";
import { DashboardSchema } from "../../customer-pages/dashboard/dashboard.model";
import { DashboardService } from "../../customer-pages/dashboard/dashboard.service";
import { DashboardController } from "../../customer-pages/dashboard/dashboard.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { rescheduleAdd, cancleAdd } = DashboardSchema;
const dashboardRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: DashboardRepository = new DashboardRepository();
const service: DashboardService = new DashboardService(repo);
const controller: DashboardController = new DashboardController(service);

dashboardRouter.get('/get-future-service-request', loginController.validateToken, controller.dashboard);

dashboardRouter.get('/get-future-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);

dashboardRouter.post('/reschedule-service/:ServiceId', loginController.validateToken, celebrate(rescheduleAdd), controller.rescheduleService, controller.rescheduleIfTimeSlotNotConflicts);

dashboardRouter.post('/cancle-service-request/:ServiceId', loginController.validateToken, celebrate(cancleAdd), controller.cancleServiceRequest);

export = dashboardRouter;