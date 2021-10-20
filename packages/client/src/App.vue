<template>
  <main
    class="content-wrapper"
    :class="{ 'content-signed': user.logged }"
  >
    <MessageList />
    
    <SendMessageForm v-if="user.logged" />
    <LoginBox v-else />
  </main>
</template>

<script lang="ts">
  import { defineComponent, onMounted, toRef } from 'vue';

  import LoginBox from '@/components/LoginBox.vue';
  import MessageList from '@/components/MessageList.vue';
  import SendMessageForm from '@/components/SendMessageForm.vue';

  import authState, { getUserProfile, signIn } from '@/store/auth';

  export default defineComponent({
    name: 'App',
    components: {
      LoginBox,
      MessageList,
      SendMessageForm
    },
	setup() {
		async function signInWithCode() {
			const [url, githubCode] = window.location.href.split('?code=');

			if (githubCode) {
				window?.history?.replaceState(null, '', url);

				await signIn(githubCode);
			}
		}

		onMounted(async () => {
			const token = localStorage.getItem('@dowhile:token');

			if (token) {
				await getUserProfile(token);
			} else {
				await signInWithCode();
			}
		});

		return { user: toRef(authState, 'user') };
	}
});

</script>

<style scoped lang="scss">
.content-wrapper {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 453px;

  column-gap: 120px;
  position: relative;
}

.content-signed::before {
  content: '';
  height: 100%;
  width: 420px;
  background: url('./assets/background.svg') no-repeat;
  background-size: cover;
  position: absolute;
  right: -200px;
  top: 0;
}
</style>
