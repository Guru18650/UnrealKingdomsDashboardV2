import { apiFetch } from '$lib/api.ts';
import { redirect } from '@sveltejs/kit';
export function load({cookies}){
    var newAcc = cookies.get("newAcc");
    
    if(newAcc == "" || cookies.get("newAcc") == null){
        newAcc = "Log in to your account";
    }
    cookies.set("newAcc","",{maxAge:-1});
    return {newAcc}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const email = data.get('email');
        const password = data.get('pass');
		if(email != "" && password != ""){
            let payload;
            if(data.get('remember') == 'on')
                payload = {email:email, password:password, expires: "200 d"};
            else
                payload = {email:email, password:password, expires: "7 d"};
            var resp = await apiFetch('/auth/login',payload);
            if(resp.data.hasOwnProperty('jwt')){
            cookies.set('jwt',resp.data.jwt,{maxAge: 60 * 60 * 24 * 30});
            cookies.set('email',email);
            return "success";
        } 
    }
       return "fail";
	}
};

