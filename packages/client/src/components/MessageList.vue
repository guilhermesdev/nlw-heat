<template>
	<div class="message-list-wrapper">
		<img :src="logoImg" alt="Logo do DoWhile 2021">

		<ul class="message-list">
			<li
				v-for="message in messages"
				:key="message.id"
				class="message"
			>
				<p class="message-content">{{ message.text }}</p>
				<div class="message-user">
					<div class="user-image">
						<img
							:src="message.user.avatar_url"
							:alt="`Foto de ${message.user.name}`"
						/>
					</div>
					<span>{{ message.user.name }}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import io from 'socket.io-client';

import logoImg from '@/assets/logo.svg';
import api from '@/services/api';

type Message = {
	id: string;
	text: string;
	user: {
		name: string,
		avatar_url: string
	}
}

export default defineComponent({
	name: 'MessageList',
	setup() {
		const messages = ref<Message[]>([]);

		const messagesQueue: Message[] = [];

		const socket = io(import.meta.env.VITE_APP_API_BASE_URL as string);

		socket.on('new_message', (newMessage: Message)=> {
			messagesQueue.push(newMessage);
		});

		onMounted(async () => {
			const { data } = await api.get<Message[]>('/messages/last/3');

			messages.value = data;
		});

		onMounted(() => {
			const timer = setInterval(() => {
				if (messagesQueue.length) {
					messages.value = [
						messagesQueue[0],
						messages.value[0],
						messages.value[1]
					].filter(Boolean);

					messagesQueue.shift();
				}
			}, 3000);
		})

		return {
			logoImg,
			messages
		};
	}
});
</script>

<style scoped lang="scss">
.message-list-wrapper {
	display: flex;
	flex-direction: column;

	justify-content: space-between;
	align-items: flex-start;

	> img {
		height: 28px;
		margin: 32px 0;
	}
}

.message-list {
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	gap: 40px;

	.message {
		max-width: 440px;

		&:nth-child(2) {
			margin-left: 80px;
		}

		&-content {
			font-size: 20px;
			line-height: 28px;
		}

		&-user {
			margin-top: 16px;
			display: flex;
			align-items: center;

			.user-image {
				padding: 2px;
				background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
				border-radius: 100%;
				line-height: 0;

				img {
					width: 36px;
					height: 36px;
					border-radius: 50%;
					border: 4px solid #121214;
				}
			}

			span {
				font-size: 16px;
				margin-left: 12px;
			}
		}
	}
}
</style>