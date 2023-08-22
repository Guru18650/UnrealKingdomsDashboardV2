<script>
	import { enhance } from '$app/forms';

    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
  

    export let data;
    let form,from,to,ammount = 0,d = false,ammountout,i,j,rate = 1,toastBG = "variant-filled-error";
    function getRate(){
        i = data.exchange.data.filter(obj => {
        return obj.currency === from
    })
        j = data.exchange.data.filter(obj => {
        return obj.currency === to
    })

    if(from==to)
        rate = 1;
    else
        rate = i[0].value/j[0].value;
    }

    $: if(from==to){
        ammountout = 0;
    } else {
        getRate();
        ammountout = ammount * rate;
    }

    $: if(ammount<0)
        ammount=0;

    function submitTest(){
        if(ammount<1){
        toastBG = "variant-filled-error";
            toastStore.trigger({message: 'Fill in valid data'})}
        else {
            var k = data.wallet.filter(obj => {
            return obj.currency === from});
            if(k[0].value < ammount){
                toastBG = "variant-filled-error";
                toastStore.trigger({message: 'Not enough coins in wallet'})}
            else{
                toastBG = "variant-filled-success";
                toastStore.trigger({message: 'Processing...'})
                d = true;
                form.requestSubmit();
            }
                
        }
    }

    
</script>

<div class="p-6 card !bg-transparent rounded-2xl shadow-4xl sm:max-w-2xl m-auto md:mt-10 mt-5 text-center">
    <h1 class="text-xl leading-tight text-center tracking-tight md:text-3xl">
        Unreal Kingdoms Exchange Platform
    </h1>
</div>
<div class="grid grid-rows-1 xl:grid-cols-3 grid-cols-1">
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Your wallet
        </h1>
        <div class="table-container mt-5">
            <table class="table table-hover">
                <thead class="uppercase">
                    <tr class="!text-center">
                        <th>Code</th>
                        <th>Name</th>
                        <th>Ammount</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.wallet as row}
                        <tr>
                            <td class="uppercase">{row.currency}</td>
                            <td>{row.name}</td>
                            <td>{row.value}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
            <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl mb-4">
                Exchange Panel
            </h1>
            <p>From</p>
            <form method="POST" bind:this={form} use:enhance={() => { return ({ result, update }) => {
                if(result.data){
                    toastBG = "variant-filled-success";
                    toastStore.trigger({message: 'Success!'})   
                    d = false;
                    
                } else {
                    toastBG = "variant-filled-error";
                    toastStore.trigger({message: 'Error, try again later'})   
                }
                update({ reset: false });
                }}}>
            <div class="input-group input-group-divider grid-cols-2 mb-5">  
            <input class="input text-right appearance-none" name="ammount" type="number" min=0 placeholder="Amount" bind:value={ammount}/>
            <select class="select" bind:value={from} name="from" on:change={getRate}>
            	<option value="uk">UK</option>
            	<option value="dg">DG</option>
            	<option value="cc">CC</option>
            </select>
            </div>
            <p>To</p>
            <div class="input-group input-group-divider grid-cols-2">  
                <input class="input text-right" disabled placeholder="Amount" bind:value={ammountout}/>
                <select class="select" bind:value={to} name="to" on:change={getRate} >
                    <option value="uk">UK</option>
                    <option value="dg" selected>DG</option>
                    <option value="cc">CC</option>
                </select>
            </div>
            <button type="button" on:click={submitTest} disabled={from==to || d} class="btn variant-filled-primary mt-5 w-full">Exchange</button>
        </form>
    </div>  
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Exchange rates
        </h1>
        <div class="table-container mt-5">
            <table class="table table-hover">
                <thead class="uppercase">
                    <tr class="!text-center">
                        <th>Code</th>
                        <th>Name</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.exchange.data as row}
                        <tr>
                            <td class="uppercase">{row.currency}</td>
                            <td>{row.name}</td>
                            <td>{row.value}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>