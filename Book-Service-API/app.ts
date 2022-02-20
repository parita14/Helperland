import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize } from "./models";
import multer from "multer";
import contactsRouter from "./routes/contact-us/contacts.routes";
import custRouter from "./routes/sign-up/customer.routes";
import SPRouter from "./routes/sign-up/sp.routes";
import LogInRouter from "./routes/sign-up/login.routes";
import passwordRouter from "./routes/sign-up/password.routes";
import userAddressRouter from "./routes/book-service/useraddress.routes";
import serviceRouter from "./routes/book-service/setService.routes";
import scheduleRouter from "./routes/book-service/schedule.routes";
import internalDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SignUp LogIn API',
            version: '1.0.0',
            description: 'SignUp LogIn API for Helperland Project',
            contact: {
                name: 'Parita Solanki',
                url: 'http://web1.anasource.com/trainee2021/',
                email: 'helperland@tatvasoft.com'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: [
            "public/routes/contact-us/contacts.routes.js",
            "public/routes/sign-up/sp.routes.js",
            "public/routes/sign-up/customer.routes.js",
            "public/routes/sign-up/login.routes.js",
            "public/routes/sign-up/password.routes.js",
            "public/routes/book-service/useraddress.routes.js",
            "public/routes/book-service/setService.routes.js",
            "public/routes/book-service/schedule.routes.js"
          ]
}

const swaggerDocs = internalDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({dest: 'Files'}).single('file'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/', contactsRouter);
app.use('/', custRouter);
app.use('/', SPRouter);
app.use('/', LogInRouter);
app.use('/', passwordRouter);
app.use('/', serviceRouter);
app.use('/', scheduleRouter);
app.use('/', userAddressRouter);

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