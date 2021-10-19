import prismaClient from "../prisma";

export default class GetLastMessagesService {
	static async execute(quantity) {
		const messages = await prismaClient.message.findMany({
			take: quantity,
			orderBy: {
				created_at: 'desc'
			},
			include: {
				user: true
			}
		});

		return messages;
	}
}