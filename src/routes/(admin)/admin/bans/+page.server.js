import { adminProtected } from "$lib/api";
import { apiFetch } from "$lib/api";

export async function load({cookies}){
    await adminProtected(cookies);
    const rows = await apiFetch('/users/getBans',{});
    const bans = rows.data.data; 
    return {bans}
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const rows = await apiFetch('/users/unban', {email:email, token:cookies.get('jwt')});
        return (rows.status == 200);
    }
}