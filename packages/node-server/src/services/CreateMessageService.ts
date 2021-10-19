import prismaClient from '../prisma';
import { io } from '../app';

export default class CreateMessageService {
	async execute(text: string, user_id: string) {
		try {
			const message = await prismaClient.message.create({
				data: {
					text,
					user_id
				},
				include: {
					user: true
				},
			});

			const infoWS = {
				...message,
				user: {
					name: message.user.name,
					avatar_url: message.user.avatar_url
				}
			};

			io.emit('new_message', infoWS);

			return message;
		} catch ({ message }) {
			throw new Error(message);
		}
	}
}