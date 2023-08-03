import { verify } from "$lib/api";

export async function load({cookies}){
    let logged = await verify(cookies);
    let email = cookies.get('email');
    return {logged, email}
}