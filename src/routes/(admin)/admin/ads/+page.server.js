import { adminProtected } from "$lib/api";
import { apiFetch } from "$lib/api";

export async function load({cookies}){
    await adminProtected(cookies);
    const rows = await apiFetch('/ads/getAll',{});
    const ads = rows.data.data; 
    return {ads}
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const id = data.get('id');
        const rows = await apiFetch('/ads/delete', {id:id});
        return (rows.status == 200);
    }
}