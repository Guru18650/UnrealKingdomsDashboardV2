import { adminProtected } from "$lib/api";
import { apiFetch } from "$lib/api";
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    await adminProtected(cookies);
    let rows = await apiFetch('/misc/download',{});
    let currentLink = rows.data.data.adress;
    let exchange = await apiFetch("/coins/exchangeRate", {});
    let uk,cc,dg;
    uk = exchange.data.filter(obj => {
        return obj.currency === 'uk'
    })[0].value;
    cc = exchange.data.filter(obj => {
        return obj.currency === 'cc'
    })[0].value;
    dg = exchange.data.filter(obj => {
        return obj.currency === 'dg'
    })[0].value;
    return {currentLink, uk, cc, dg};
}

export const actions = {
	updateLink: async ({ request, cookies }) => {
		const data = await request.formData();
        const link = data.get('nLink');
        if(link!=""){
            let payload;
            payload = {token:cookies.get('jwt'),link:link};
            var resp = await apiFetch('/misc/updateDownload',payload);
            return (resp.status == 200);
        }
        return false;
    },
    addAd: async ({ request, cookies }) => {
        const data = await request.formData();
        const buildingID = data.get('buildingid');
        const floor = data.get('floor');
        const texture = data.get('texture');
        const owner = data.get('owner');
        if(buildingID!=""||floor!=""||texture!=""||owner!=""){
            let payload;
            payload = {id:buildingID, floor:floor, texture:texture, owner:owner};
            var resp = await apiFetch('/ads/add', payload);
            return (resp.status == 200)
        }
        return false;
    },
    ban: async ({ request, cookies }) => {
		const data = await request.formData();
        const banEmail = data.get('banEmail');
        if(banEmail!=""){
            let payload;
            payload = {token:cookies.get('jwt'),email:banEmail};
            var resp = await apiFetch('/users/ban',payload);
            return (resp.status == 200);
        }
        return false;
    },
    promote: async ({ request, cookies }) => {
		const data = await request.formData();
        const banEmail = data.get('adminEmail');
        if(banEmail!=""){
            let payload;
            payload = {token:cookies.get('jwt'),email:banEmail};
            var resp = await apiFetch('/users/promote',payload);
            return (resp.status == 200);
        }
        return false;
    },
    eRates: async ({ request, cookies }) => {
        const data = await request.formData();
        const uk = data.get('uk');
        const cc = data.get('cc');
        const dg = data.get('dg');
        if(uk!=""||cc!=""||dg!=""){
            let payload = {token:cookies.get('jwt'),uk:uk,cc:cc,dg:dg};
            var resp = await apiFetch('/coins/setRates', payload);
            return(resp.status == 200);
        }
        return false;
    },
    logout: async ({ request, cookies }) => {
        cookies.set('jwt','',{maxAge:-1})
        cookies.set('email','',{maxAge:-1})
        throw redirect(307, '/admin');
    }
}