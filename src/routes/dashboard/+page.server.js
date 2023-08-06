import { protectedPage } from "$lib/api";
import { apiFetch } from "$lib/api";

export async function load({cookies}){
    let rows = await apiFetch('/misc/download',{});
    let link = rows.data.data.adress;
    return {link};
}
