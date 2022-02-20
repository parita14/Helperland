import { NextFunction, Request, Response } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { ScheduleService } from "./schedule.service";
import jwt from "jsonwebtoken";

import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

require("dotenv").config();

export class ScheduleController {
  public constructor(private readonly scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  public decodeToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const token = req.headers.authorization;
    if(token) {
      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
        if(error) {
          return res.status(400).json("Invalid Login!");
        }
        else {
          req.body.ZipCode = user.ZipCode;
          req.body.Email = user.Email;
          return this.scheduleService
            .findByEmail(user.Email)
            .then((user) => {
              if(user?.UserTypeId === 1) {
                next();
              }
              else {
                return res.status(400).json("You are not customer, try to login using customer account!");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({ error: error });
            });
        }
      });
    }
    else {
      return res.status(400).json("Token not exists!");
    }
  };

  public createService = async (req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization;
    req.body.ServiceHourlyRate = 25;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.SubTotal = req.body.ServiceHourlyRate * req.body.ServiceHours
    req.body.TotalCost = req.body.ExtraService.length * 12.5 + req.body.SubTotal;
    req.body.ServiceRequestAddress.Email = req.body.Email;

      return this.scheduleService
        .findByEmail(req.body.Email)
        .then((user) => {
          if(user) {
            if(user.UserTypeId === 1) {
              req.body.UserId = user.UserId;
              req.body.ModifiedBy = user.UserId;
            }
            else {
              return res.status(404).json("You are not a Customer!");
            }
          }
          else {
            return res.status(404).json("No user exists with this email!");
          }
          return this.scheduleService
            .scheduleService(req.body)
            .then((service) => {
              return this.scheduleService
                .getSP()
                .then((sp) => {
                  if(sp) {
                    for(let email in sp) {
                      const serviceRequest = this.scheduleService.serviceRequest(sp[email].Email!);
                      mg.messages().send(serviceRequest, (err, body:any) => {
                        if(err) {
                          return res.json({ err });
                        }
                      })
                    }
                    return res.status(200).json({ service });
                  }
                  else {
                    return res.status(404).json("No service provider found!");
                  }
                })
                .catch((error: Error) => {
                  return res.status(500).json({ error });
                });
            })
            .catch((error: Error) => {
              return res.status(500).json({ error: error });
            });
        })
        .catch((error: Error) => {
          return res.status(500).json({ error: error });
        });
  };
}