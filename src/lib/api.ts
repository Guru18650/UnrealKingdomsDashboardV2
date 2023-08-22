import axios from 'axios';
import { redirect } from '@sveltejs/kit';

export async function apiFetch(endpoint, payload) {
        var resp = await axios.post('https://api.unrealkingdoms.com'+endpoint, payload, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, validateStatus: function (status) {return status < 500;}});
            return {data:resp.data, status:resp.status};
        }
    

export async function verify(cookies, admin) {
    var payload;
	const jwt = cookies.get('jwt');
    if(jwt === undefined){
        return false;
    } else {
        if(admin)
            payload = {token:jwt, admin:admin}
        else
            payload = {token:jwt}
        var resp = await apiFetch('/auth/verify',payload);
        if(!resp.data.authenticated){
            return false;
        } else {
            return true;
        }
    }
}

export async function protectedPage(cookies){
    if(!await verify(cookies, false)){
        throw redirect(307, '/login');
    }
}

export async function adminProtected(cookies){
    const x = await verify(cookies, true);
    if(!x){
        throw redirect(307, '/admin/login');
    }
}