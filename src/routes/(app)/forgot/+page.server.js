import { apiFetch } from '$lib/api.ts';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const email = data.get('email');
		if(email != ""){
            let payload = {email:email};
            await apiFetch('/auth/reset',payload);
            return "success";
        } 
    }
}

