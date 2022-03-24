import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize } from "./models";
import multer from "multer";

import SPRouter from "./routes/sign-up/sp.routes";
import custRouter from "./routes/sign-up/customer.routes";
import LogInRouter from "./routes/sign-up/login.routes";
import passwordRouter from "./routes/sign-up/password.routes";

import contactsRouter from "./routes/contact-us/contacts.routes";

import serviceRouter from "./routes/book-service/setService.routes";
import scheduleRouter from "./routes/book-service/schedule.routes";

import dashboardRouter from "./routes/customer-pages/dashboard.routes";
import historyRouter from "./routes/customer-pages/history.routes";
import favRouter from "./routes/customer-pages/fav.routes";
import settingsRouter from "./routes/customer-pages/settings.routes";

import newServiceRouter from "./routes/sp-screens/newService.routes";
import upcomingServiceRouter from "./routes/sp-screens/upcoming.routes";
import spHistoryRouter from "./routes/sp-screens/history.routes";
import rAndbRouter from "./routes/sp-screens/r&b.routes";
import spSettingsRouter from "./routes/sp-screens/spSettings.routes";

import srRouter from "./routes/admin-screens/sr.routes";
import userRouter from "./routes/admin-screens/user.routes";

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
            "public/routes/sign-up/sp.routes.js",
            "public/routes/sign-up/customer.routes.js",
            "public/routes/sign-up/login.routes.js",
            "public/routes/sign-up/password.routes.js",
            "public/routes/contact-us/contacts.routes.js",
            "public/routes/book-service/setService.routes.js",
            "public/routes/book-service/schedule.routes.js",
            "public/routes/customer-pages/dashboard.routes.js",
            "public/routes/customer-pages/history.routes.js",
            "public/routes/customer-pages/fav.routes.js",
            "public/routes/customer-pages/settings.routes.js",
            "public/routes/sp-screens/newService.routes.js",
            "public/routes/sp-screens/upcoming.routes.js",
            "public/routes/sp-screens/history.routes.js",
            "public/routes/sp-screens/r&b.routes.js",
            "public/routes/sp-screens/spSettings.routes.js",
            "public/routes/Admin-screens/sr.routes.js",
            "public/routes/admin-screens/user.routes.js"
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
