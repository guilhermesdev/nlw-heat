import 'dotenv/config';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import http from 'http';

import router from './routes';

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: '*'
	}
});

io.on('connection', socket => {
	console.log('User connect on socket', socket.id);
});

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/github', (_req, res) => {
	const URL = 'https://github.com/login/oauth/authorize?client_id=';
	res.redirect(URL + process.env.GITHUB_CLIENT_ID);
});

app.get('/signin/callback', (req, res) => {
	const { code } = req.query;
	res.json(code);
});

export { httpServer, io };