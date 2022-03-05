"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var settings_repository_1 = require("../../customer-pages/my-settings/settings.repository");
var settings_model_1 = require("../../customer-pages/my-settings/settings.model");
var settings_service_1 = require("../../customer-pages/my-settings/settings.service");
var settings_controller_1 = require("../../customer-pages/my-settings/settings.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var detailsAdd = settings_model_1.SettingsSchema.detailsAdd, addressAdd = settings_model_1.SettingsSchema.addressAdd, passwordAdd = settings_model_1.SettingsSchema.passwordAdd;
var settingsRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new settings_repository_1.SettingsRepository();
var service = new settings_service_1.SettingsService(repo);
var controller = new settings_controller_1.SettingsController(service);
settingsRouter.put('/update-user-details', loginController.validateToken, (0, celebrate_1.celebrate)(detailsAdd), controller.updateUserDetails);
settingsRouter.put('/update-user-address/:Id', loginController.validateToken, (0, celebrate_1.celebrate)(addressAdd), controller.updateUserAddress);
settingsRouter.delete('/delete-user-address/:Id', loginController.validateToken, controller.deleteAddress);
settingsRouter.put('/change-user-password', loginController.validateToken, (0, celebrate_1.celebrate)(passwordAdd), controller.changePassword);
module.exports = settingsRouter;
