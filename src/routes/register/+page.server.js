import { apiFetch } from '$lib/api.ts';
import { redirect } from '@sveltejs/kit';
import * as EmailValidator from 'email-validator';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const pass1 = data.get('pass1');
		const uname = data.get('uname');


		if (EmailValidator.validate(email) && pass1.length>7 && uname.length>5) {
			const payload = { email: email, password: pass1, username: uname};
			var resp = await apiFetch('/auth/register', payload);
			cookies.set('newAcc', 'Account created, log in');
			throw redirect(307, '/login');
		}
	}
};
