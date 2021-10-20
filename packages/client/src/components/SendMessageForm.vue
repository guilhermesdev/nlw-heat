<template>
	<div class="send-message-form-wrapper">
		<button
			@click="signOut"
			class="sign-out-button"
		>
			<SignOutIcon width="32" />
		</button>

		<header class="user-info">
			<div class="user-image">
				<img
					:src="user.avatar_url"
					:alt="`Foto de ${user.name}`"
				/>
			</div>
			<strong class="user-name">{{ user.name }}</strong>
			<span class="user-github">
				<GithubIcon width="16" fill="currentColor" />
				{{ user.login }}
			</span>
		</header>

		<form @submit.prevent="handleSendMessage">
			<label for="message">Mensagem</label>
			<textarea
				v-model.trim="message"
				name="message"
				id="message"
				placeholder="Qual sua expectativa para o evento?"
			/>

			<button type="submit">Enviar mensagem</button>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import SignOutIcon from '@/components/icons/SignOutIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import authState, { signOut } from '@/store/auth';
import api from '@/services/api';

export default defineComponent({
	name: 'SendMessageForm',
	components: {
		SignOutIcon,
		GithubIcon
	},
	setup() {
		const message = ref('');

		async function handleSendMessage() {
			if (!message.value) return;

			await api.post('/messages', {
				message: message.value
			});

			message.value = '';
		}

		return {
			SignOutIcon,
			signOut,
			message,
			handleSendMessage,
			user: authState.user
		};
	}
});
</script>

<style scoped lang="scss">
.send-message-form-wrapper {
	background-color: #1b1b1f;
	padding: 24px;
	align-self: center;

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	position: relative;
}

.sign-out-button {
	background-color: transparent;
	fill: #c4c4cc;
	border: 0;

	position: absolute;
	left: 24px;
	top: 24px;

	cursor: pointer;

	&:hover {
		filter: brightness(0.85);
	}
}

.user {

	&-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&-image {
		padding: 3px;
		background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
		border-radius: 100%;
		line-height: 0;

		img {
			width: 94px;
			height: 94px;
			border-radius: 50%;
			border: 6px solid #121214;
		}
	}

	&-name {
		font-size: 24px;
		line-height: 30px;
		margin-top: 16px;
	}

	&-github {
		display: flex;
		align-items: center;

		margin-top: 8px;
		color: #c4c4cc;

		svg {
			margin-right: 8px;
		}
	}
}

form {
	display: flex;
	flex-direction: column;
	align-self: stretch;
	margin-top: 48px;

	background-color: #202024;

	label {
		padding: 18px 24px;
		font-size: 20px;
		background-color: #29292e;
		font-weight: 700;
		text-align: left;
	}

	textarea {
		background-color: transparent;
		border: 0;
		padding: 24px;
		resize: none;
		height: 160px;
		color: #e1e1e6;
		font-size: 16px;
		line-height: 24px;

		outline: 0;

		&::placeholder {
			color: #8d8d99;
		}
	}

	button {
		align-self: flex-end;
		background-color: #ff008e;
		margin: 24px;
		padding: 0 32px;
		height: 40px;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		text-transform: uppercase;
		border: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
		transition: .15s;

		&:hover {
			filter: brightness(0.85);
		}
	}
}

</style>