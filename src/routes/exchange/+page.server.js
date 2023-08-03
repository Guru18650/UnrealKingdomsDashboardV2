import { protectedPage } from "$lib/api";
import { apiFetch } from "$lib/api";

export async function load({cookies}){
    await protectedPage(cookies);
    let exchange = await apiFetch("/coins/exchangeRate", {});
    let k = await apiFetch("/coins/get", {email: cookies.get('email')});
    const wallet = JSON.parse(JSON.stringify(exchange.data));
    wallet[0].value = k.data.dg_coin;
    wallet[1].value = k.data.cc_coin;
    wallet[2].value = k.data.uk_coin;
    return {exchange, wallet}
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const from = data.get('from');
        const to = data.get('to');
        const ammount = data.get('ammount');

        if(ammount>0){
            const payload = {email:cookies.get('email'), value:ammount, from:from, to:to};
            var resp = await apiFetch('/coins/exchange', payload);
            if(resp.data=="Success"){
                return true;
            } else {
                return false;
            }
        }
    }
}
