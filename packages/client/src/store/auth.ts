import { reactive } from 'vue';

import api from '@/services/api';

const clientId = import.meta.env.VITE_APP_GITHUB_CLIENT_ID;
export const signInUrl =
	`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}`;

type User = {
	id: string;
	avatar_url: string;
	name: string;
	login: string;
	logged?: boolean
};

type AuthResponse = {
	token: string;
	user: User
};

const state = reactive<{ user: User }>({
	user: {
		id: '',
		name: '',
		login: '',
		avatar_url: '',
		logged: false
	}
});

export async function signIn(githubCode: string) {
	const { data } = await api.post<AuthResponse>('authenticate', {
		code: githubCode
	});

	const { token, user } = data;

	api.defaults.headers.common.authorization = `Bearer ${token}`;

	localStorage.setItem('@dowhile:token', token);
	setUser({ ...user, logged: true });
}

export async function getUserProfile(token: string) {
	api.defaults.headers.common.authorization = `Bearer ${token}`;

	const { data } = await api.get<User>('/profile');

	setUser({ ...data, logged: true });
}

export function signOut() {
	setUser({
		id: '',
		name: '',
		login: '',
		avatar_url: '',
		logged: false
	});

	localStorage.removeItem('@dowhile:token');
}

export function setUser(userData: User) {
	state.user = userData;
}

export default state;