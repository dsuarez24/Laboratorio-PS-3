'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import publicationRoutes from '../src/posts/posts.routes.js';
import commentRoutes from '../src/comments/comments.routes.js'



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/opinionmanager/v1/user'
        this.authPath = '/opinionmanager/v1/auth'
        this.publicationPath = '/opinionmanager/v1/posts'
        this.commentPath = '/opinionmanager/v1/comments'

        this.middlewares();
        this.conectarDB();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }
    routes() {
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.commentPath, commentRoutes)
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;