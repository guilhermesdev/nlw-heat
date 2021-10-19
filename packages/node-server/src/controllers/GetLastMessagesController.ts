import { Request, Response } from "express";
import GetLastMessagesService from "../services/GetLastMessagesService";

export default class GetLastMessagesController {
	async handle(req: Request, res: Response) {
		const { quantity } = req.params;
		const messages = await GetLastMessagesService.execute(+quantity);


		return res.json(messages);
	}
}