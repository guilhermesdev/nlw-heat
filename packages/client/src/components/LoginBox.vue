<template>
	<div class="login-box-wrapper">
		<strong>Entre e compartilhe sua mensagem</strong>
		<a :href="signInUrl" class="sign-in-with-github">
			<GithubIcon width="30" />
			Entrar com Github
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { signInUrl } from '@/store/auth';
import GithubIcon from '@/components/icons/GithubIcon.vue';

export default defineComponent({
	name: 'LoginBox',
	components: {
		GithubIcon
	},
	setup() {
		return { signInUrl };
	}
});
</script>

<style scoped lang="scss">
.login-box-wrapper {
	height: 100%;
	width: 100%;
	background: #17171a url(../assets/banner-girl.png) no-repeat center top;

	padding: 440px 80px 0;
	text-align: center;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	strong {
		font-size: 32px;
		line-height: 36px;
	}

	.sign-in-with-github {
		background-color: #ffcd1e;
		margin-top: 32px;
		padding: 0 40px;
		height: 56px;
		color: #09090a;
		font-size: 14px;
		font-weight: bold;
		text-transform: uppercase;
		text-decoration: none;

		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
		transition: .15s;

		&:hover {
			filter: brightness(0.85);
		}

		svg {
			margin-right: 16px;
		}
	}
}
</style>