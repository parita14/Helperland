import express from "express";
import { celebrate } from "celebrate";

import { SettingsRepository } from "../../customer-pages/my-settings/settings.repository";
import { SettingsSchema } from "../../customer-pages/my-settings/settings.model";
import { SettingsService } from "../../customer-pages/my-settings/settings.service"; 
import { SettingsController } from "../../customer-pages/my-settings/settings.controller"; 

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { detailsAdd, addressAdd, passwordAdd } = SettingsSchema;
const settingsRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: SettingsRepository = new SettingsRepository();
const service: SettingsService = new SettingsService(repo);
const controller: SettingsController = new SettingsController(service);

settingsRouter.put('/update-user-details', loginController.validateToken, celebrate(detailsAdd), controller.updateUserDetails);

settingsRouter.put('/update-user-address/:Id', loginController.validateToken, celebrate(addressAdd), controller.updateUserAddress);

settingsRouter.delete('/delete-user-address/:Id', loginController.validateToken, controller.deleteAddress);

settingsRouter.put('/change-user-password', loginController.validateToken, celebrate(passwordAdd), controller.changePassword);

export = settingsRouter;