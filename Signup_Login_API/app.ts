import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize } from "./models";
import custRouter from "./routes/customer.routes";
import SPRouter from "./routes/sp.routes";
import LogInRouter from "./routes/login.routes";
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
            "public/routes/sp.routes.js",
            "public/routes/customer.routes.js",
            "public/routes/login.routes.js"
          ]
}

const swaggerDocs = internalDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/', custRouter);
app.use('/', SPRouter);
app.use('/', LogInRouter);

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