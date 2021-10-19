import { Request, Response } from 'express';

import CreateMessageService from '../services/CreateMessageService';

export default class CreateMessageController {
	async handle(req: Request, res: Response) {
		const { message } = req.body;
		const { user_id } = req;

		try {
			const service = new CreateMessageService();
			const result = await service.execute(message, user_id);

			return res.json(result);
		} catch ({ message }) {
			return res.status(500).json({ error: message });
		}
	}
}