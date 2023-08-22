import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    cookies.set("jwt","", {maxAge:-1});
    throw redirect(301,'/');

}
