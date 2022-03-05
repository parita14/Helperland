"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var dashboard_repository_1 = require("../../customer-pages/dashboard/dashboard.repository");
var dashboard_model_1 = require("../../customer-pages/dashboard/dashboard.model");
var dashboard_service_1 = require("../../customer-pages/dashboard/dashboard.service");
var dashboard_controller_1 = require("../../customer-pages/dashboard/dashboard.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var rescheduleAdd = dashboard_model_1.DashboardSchema.rescheduleAdd, cancleAdd = dashboard_model_1.DashboardSchema.cancleAdd;
var dashboardRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new dashboard_repository_1.DashboardRepository();
var service = new dashboard_service_1.DashboardService(repo);
var controller = new dashboard_controller_1.DashboardController(service);
dashboardRouter.get('/get-future-service-request', loginController.validateToken, controller.dashboard);
dashboardRouter.get('/get-future-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);
dashboardRouter.post('/reschedule-service/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(rescheduleAdd), controller.rescheduleService, controller.rescheduleIfTimeSlotNotConflicts);
dashboardRouter.post('/cancle-service-request/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(cancleAdd), controller.cancleServiceRequest);
module.exports = dashboardRouter;
