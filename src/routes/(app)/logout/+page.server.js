import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    cookies.set("jwt","");
    throw redirect(301,'/');

}
