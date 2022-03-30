import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize } from "./models";
import multer from "multer";

import contactsRouter from "./routes/1)contact-us/contacts.routes";

import SPRouter from "./routes/2)sign-up/sp.routes";
import custRouter from "./routes/2)sign-up/customer.routes";
import LogInRouter from "./routes/2)sign-up/login.routes";
import passwordRouter from "./routes/2)sign-up/password.routes";

import serviceRouter from "./routes/3)book-service/setService.routes";
import scheduleRouter from "./routes/3)book-service/schedule.routes";

import dashboardRouter from "./routes/4)customer-pages/dashboard.routes";
import historyRouter from "./routes/4)customer-pages/history.routes";
import favRouter from "./routes/4)customer-pages/fav.routes";
import settingsRouter from "./routes/4)customer-pages/settings.routes";

import newServiceRouter from "./routes/5)sp-screens/newService.routes";
import upcomingServiceRouter from "./routes/5)sp-screens/upcoming.routes";
import spHistoryRouter from "./routes/5)sp-screens/history.routes";
import rAndbRouter from "./routes/5)sp-screens/r&b.routes";
import spSettingsRouter from "./routes/5)sp-screens/spSettings.routes";

import srRouter from "./routes/6)admin-screens/sr.routes";
import userRouter from "./routes/6)admin-screens/user.routes";

import internalDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Helperland API',
            version: '1.0.0',
            description: 'Helperland Project',
            contact: {
                name: 'Parita Solanki',
                url: 'http://web1.anasource.com/trainee2021/',
                email: 'solankiparita7@gmail.com'
            },
            servers: ["http://localhost:3000"]
        },
    },
    apis: [
            "public/routes/1)contact-us/contacts.routes.js",
            "public/routes/2)sign-up/customer.routes.js",
            "public/routes/2)sign-up/sp.routes.js",
            "public/routes/2)sign-up/login.routes.js",
            "public/routes/2)sign-up/password.routes.js",
            "public/routes/3)book-service/setService.routes.js",
            "public/routes/3)book-service/schedule.routes.js",
            "public/routes/4)customer-pages/dashboard.routes.js",
            "public/routes/4)customer-pages/history.routes.js",
            "public/routes/4)customer-pages/fav.routes.js",
            "public/routes/4)customer-pages/settings.routes.js",
            "public/routes/5)sp-screens/newService.routes.js",
            "public/routes/5)sp-screens/upcoming.routes.js",
            "public/routes/5)sp-screens/history.routes.js",
            "public/routes/5)sp-screens/r&b.routes.js",
            "public/routes/5)sp-screens/spSettings.routes.js",
            "public/routes/6)admin-screens/sr.routes.js",
            "public/routes/6)admin-screens/user.routes.js"
          ]
}

const swaggerDocs = internalDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({dest: 'Files'}).single('file'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/', SPRouter);
app.use('/', custRouter);
app.use('/', LogInRouter);
app.use('/', passwordRouter);
app.use('/', contactsRouter);
app.use('/', serviceRouter);
app.use('/', scheduleRouter);
app.use('/', dashboardRouter);
app.use('/', historyRouter);
app.use('/', favRouter);
app.use('/', settingsRouter);
app.use('/', newServiceRouter);
app.use('/', upcomingServiceRouter);
app.use('/', spHistoryRouter);
app.use('/', rAndbRouter);
app.use('/', spSettingsRouter);
app.use('/', srRouter);
app.use('/', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`);
    sequelize.authenticate().then(async() => {
        console.log("database connected");
        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }
    }).catch( (e: any) => {
        console.log(e.message)
    });
});