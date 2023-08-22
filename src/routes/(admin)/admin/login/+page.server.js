import { apiFetch } from '$lib/api.ts';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const email = data.get('email');
        const password = data.get('pass');
		if(email != "" && password != ""){
            let payload;
            payload = {email:email, password:password, admin: 'true'};
            var resp = await apiFetch('/auth/login',payload);
            if(resp.data.hasOwnProperty('jwt')){
            cookies.set('jwt',resp.data.jwt,{maxAge: 60 * 60, path:'/'});
            return "success";
        } 
    }
       return "fail";
	}
};

