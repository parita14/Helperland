import { NextFunction, Request, Response } from "express";
import { FavService } from "./fav.service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class FavController {
    public constructor(private readonly favService: FavService) {
        this.favService = favService;
    }

    public SPworkedwithCustomer = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.favService
                      .findByEmail(user.Email)
                      .then((user) => {
                          if(user) {
                            if(user.UserTypeId === 1) {
                                return this.favService
                                  .findServiceById(user.UserId)
                                  .then((service) => {
                                      if(service) {
                                        const spId = this.favService.findAllSpIdWorkedWithCustInPast(service);
                                        if(spId.length > 0) {
                                            return this.favService
                                              .findAllSPWorkedWithCustInPast(spId)
                                              .then(async (sp) => {
                                                  if(sp && sp.length > 0) {
                                                    const Sp = await this.favService.findAllSpWorkedWithCust(spId);
                                                    if(Sp) {
                                                        if(Sp.length > 0) {
                                                            return res.status(200).json(Sp);
                                                        }
                                                        else {
                                                            return res.status(404).json("sp not found!");
                                                        }
                                                    }
                                                    else {
                                                        return res.status(404).json("No sp exists!");
                                                    }
                                                  }
                                                  else {
                                                    return res.status(404).json("There is no helper worked with you in past!");
                                                  }
                                              })
                                              .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                              });
                                        }
                                        else {
                                            return res.status(404).json("There is no helper worked with you in past!");
                                        }
                                      }
                                      else {
                                          return res.status(404).json("Service not exists!");
                                      }
                                  })
                                  .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                            }
                          }
                          else {
                              return res.status(404).json("User not exists!");
                          }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public FavSP = async(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.favService
                      .findByEmail(user.Email)
                      .then((user) => {
                          if(user) {
                            if(user.UserTypeId === 1) {
                                req.body.UserId = user.UserId;
                                req.body.TargetUserId = req.params.spId;
                                return this.favService
                                  .findServiceById(user.UserId)
                                  .then((service) => {
                                    if(service) {
                                        const helperId = this.favService.findAllSpIdWorkedWithCustInPast(service);
                                        if(helperId.length > 0) {
                                            const spArray = helperId.includes(parseInt(req.params.spId));
                                            if(spArray) {
                                                if(req.body.IsFavorite) {
                                                    return this.favService
                                                      .findFavoriteSp(user.UserId, +req.params.spId)
                                                      .then((fav) => {
                                                        if(fav) {
                                                            if(fav.IsFavorite) {
                                                                return res.status(400).json("Service Provider already exists in your Favourite Service Provider list!");
                                                            }
                                                            else {
                                                                return this.favService
                                                                  .updateFavoriteSp(req.body)
                                                                  .then((favorite) => {
                                                                    if(favorite.length > 0) {
                                                                        res.status(200).json("Favorite Service Provider updated successfully!");
                                                                    }
                                                                    else {
                                                                        res.status(400).json("Updation failed!");
                                                                    }
                                                                  })
                                                                  .catch((error: Error) => {
                                                                    return res.status(500).json({ error: error });
                                                                  });
                                                            }
                                                        }
                                                        else {
                                                            req.body.IsBlocked = false;
                                                            return this.favService
                                                              .createFavoriteSp(req.body)
                                                              .then((favSp) => {
                                                                  if(favSp) {
                                                                      return res.status(200).json("Favourite Service Provider created successfully!");
                                                                  }
                                                                  return res.status(400).json("Creation failed!");
                                                              })
                                                              .catch((error: Error) => {
                                                                return res.status(500).json({ error: error });
                                                              });
                                                        }
                                                      })
                                                      .catch((error: Error) => {
                                                        return res.status(500).json({ error: error });
                                                      });
                                                }
                                                else if(req.body.IsFavorite === false) {
                                                    next();
                                                }
                                                else {
                                                    return res.status(400).json("Not found!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("Service Provider not worked with customer in past!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("There is no helper worked with you in past!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Service not exists!");
                                    }
                                  })
                                  .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("User not exists!");
                            }
                        }
                        else {
                            return res.status(404).json("User not exists!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public removeFavSp = async(req: Request, res: Response): Promise<Response | undefined> => {
      const token = req.headers.authorization || req.header('auth');

      if(token) {
          jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
              if(error) {
                  return res.status(400).json("Invalid Login!");
              }
              else {
                  return this.favService
                    .findByEmail(user.Email)
                    .then((user) => {
                        if(user) {
                          if(user.UserTypeId === 1) {
                              return this.favService
                                .findFavoriteSp(user.UserId, +req.params.spId)
                                .then((fav) => {
                                    if(fav) {
                                      if(fav?.IsFavorite) {
                                          return this.favService
                                            .updateFavoriteSp(req.body)
                                            .then((favSp) => {
                                                if(favSp) {
                                                    return res.status(200).json("Service Provider updated successfully!");
                                                }
                                                  else {
                                                      return res.status(400).json("Updation failed!");
                                                  }
                                              })
                                              .catch((error: Error) => {
                                                  return res.status(500).json({ error: error });
                                                });
                                        }
                                        else if(fav?.IsFavorite === false) {
                                          return res.status(400).json("Service Provider already in unfavourite list!");
                                        }
                                        else {
                                            return res.status(404).json("No helper exists to remove!");
                                        }
                                      }
                                      else {
                                        return res.status(404).json("No helper exists!");
                                    }
                                  })
                                  .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("User not exists!");
                            }
                        }
                        else {
                            return res.status(404).json("User not exists!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public blockSP = async(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.favService
                      .findByEmail(user.Email)
                      .then((user) => {
                          if(user) {
                            if(user.UserTypeId === 1) {
                                req.body.UserId = user.UserId;
                                req.body.TargetUserId = req.params.spId;
                                return this.favService
                                  .findServiceById(user.UserId)
                                  .then((service) => {
                                    const helperId = this.favService.findAllSpIdWorkedWithCustInPast(service);
                                    if(helperId.length > 0) {
                                      const spArray = helperId.includes(parseInt(req.params.spId));
                                      if(spArray) {
                                        if(req.body.IsBlocked) {
                                          return this.favService
                                            .findFavoriteSp(user.UserId, req.body.TargetUserId)
                                            .then((helper) => {
                                              if(helper) {
                                                if(helper.IsBlocked) {
                                                  return res.status(400).json("Service Provider already in blocked list!");
                                                }
                                                else {
                                                  return this.favService
                                                    .updateBlockedSp(req.body)
                                                    .then((sp) => {
                                                      if(sp.length > 0) {
                                                        return res.status(200).json("Service Provider added in blocked list!");
                                                      }
                                                      else {
                                                        return res.status(400).json("Failure in adding Service Provider to the blocked list!");
                                                      }
                                                    })
                                                    .catch((error: Error) => {
                                                      return res.status(500).json({ error: error });
                                                    });
                                                }
                                              }
                                              else {
                                                req.body.IsFavorite = false;
                                                return this.favService
                                                  .createFavoriteSp(req.body)
                                                  .then((blockedSP) => {
                                                    if(blockedSP) {
                                                      return res.status(200).json("Blocked Service Provider created successfully!");
                                                    }
                                                    else {
                                                      return res.status(400).json("Failure in creating blocked Service Provider!");
                                                    }
                                                  })
                                                  .catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                  });
                                              }
                                            })
                                            .catch((error: Error) => {
                                              return res.status(500).json({ error: error });
                                            });
                                        }
                                        else if(req.body.IsBlocked === false) {
                                          next();
                                        }
                                        else {
                                          return res.status(404).json("Not found!");
                                        }
                                      }
                                      else {
                                        return res.status(404).json("Service Provider not worked with customer in past!");
                                      }
                                    }
                                    else {
                                      return res.status(404).json("There is no helper worked with you in past!");
                                    }
                                  })
                                  .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("User not exists!");
                            }
                        }
                        else {
                            return res.status(404).json("User not exists!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public removeBlockedSp = async(req: Request, res: Response): Promise<Response | undefined> => {
      const token = req.headers.authorization || req.header('auth');

      if(token) {
          jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
              if(error) {
                  return res.status(400).json("Invalid Login!");
              }
              else {
                  return this.favService
                    .findByEmail(user.Email)
                    .then((user) => {
                        if(user) {
                          if(user.UserTypeId === 1) {
                              return this.favService
                                .findFavoriteSp(user.UserId, req.body.TargetUserId)
                                .then((blocked) => {
                                    if(blocked) {
                                      if(blocked?.IsBlocked) {
                                          return this.favService
                                            .updateBlockedSp(req.body)
                                            .then((blockedSp) => {
                                                if(blockedSp) {
                                                    return res.status(200).json("Blocked Service Provider updated successfully!");
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                              })
                                              .catch((error: Error) => {
                                                  return res.status(500).json({ error: error });
                                                });
                                        }
                                        else if(blocked?.IsBlocked === false) {
                                          return res.status(400).json("Service Provider already in unblocked list!");
                                        }
                                        else {
                                          return res.status(404).json("No helper exists to remove!");
                                        }
                                      }
                                      else {
                                        return res.status(404).json("No helper exists!");
                                      }
                                  })
                                  .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("User not exists!");
                            }
                        }
                        else {
                            return res.status(404).json("User not exists!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

}