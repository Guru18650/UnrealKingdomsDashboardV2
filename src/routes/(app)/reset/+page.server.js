import { apiFetch } from '$lib/api.ts';
import { redirect } from '@sveltejs/kit';
import { protectedPage } from "$lib/api";

var y;
export async function load({url}){
var x = url.searchParams.get('j');
y = x;
if(x == null){
    throw redirect(307, '/');
}
let rows = await apiFetch('/auth/verify',{token:x})
if(rows.data.authenticated != true){
    throw redirect(307, '/');
}
return {data:rows.data.data}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const pass = data.get('pass1');
		if(pass != ""){
            let payload = {token:y,password:pass};
            await apiFetch('/auth/changepass',payload);
            throw redirect(307, '/login');
            return "success";
        } 
    }
}

