import express from "express";
import { celebrate } from "celebrate";

import { UserAddressRepository } from "../../book-service/user-address/address.repository";
import { UserAddressSchema } from "../../book-service/user-address/address.model";
import { UserAddressService } from "../../book-service/user-address/address.service";
import { UserAddressController } from "../../book-service/user-address/address.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { addressAdd } = UserAddressSchema;
const userAddressRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: UserAddressRepository = new UserAddressRepository();
const service: UserAddressService = new UserAddressService(repo);
const controller: UserAddressController = new UserAddressController(service);

userAddressRouter.post('/user-address', celebrate(addressAdd), loginController.validateToken, controller.UserAddress);

userAddressRouter.get('/get-user-addresses', loginController.validateToken, controller.getAddresses);

export = userAddressRouter;