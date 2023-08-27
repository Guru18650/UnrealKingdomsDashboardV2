<script lang="ts">
    export let data;
	import { enhance } from '$app/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import { invalidate, invalidateAll } from '$app/navigation';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
</script>
<div class="p-6 card !bg-transparent rounded-2xl shadow-4xl sm:max-w-2xl m-auto md:mt-10 mt-5 text-center">
    <h1 class="text-xl leading-tight text-center tracking-tight md:text-3xl">
        Unreal Kingdoms Admin Panel
    </h1>
</div>
<div class="grid grid-rows-1 xl:grid-cols-3 grid-cols-1">
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Download link
        </h1>
        <form method="POST" action="?/updateLink" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.data != true){
                toastStore.trigger({message:'Failed'});
            } else {
                toastStore.trigger({message:'Success'});
                form.reset();
                invalidateAll();
            }
        }}}>
        <div class="pt-3 font-medium text-small">
            <label class="label mt-3">
                <span>Current link</span>
                <a href={data.currentLink}><input class="input rounded-lg mt-3" type="text" disabled bind:value={data.currentLink}/></a>
              </label>
              <label class="label mt-3">
              <span>New Link</span>
              <input class="input rounded-lg mt-3" type="text" name="nLink"/>
            </label>
            <button type="submit" class="btn variant-filled-primary w-1/4 rounded-lg mt-5">Update</button>
          </div>
        </form>
    </div>
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Ad Manager
        </h1>
        <form method="POST" action="?/addAd" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.data != true){
                toastStore.trigger({message:'Failed'});
            } else {
                toastStore.trigger({message:'Success'});
                document.location.reload();
            }
        }}}>
        <div class="grid grid-rows-1 xl:grid-cols-2 grid-cols-2">
            <div class="pt-3 font-medium text-small mr-3">
                <label class="label mt-3">
                <span>Building ID</span>
                <input class="input rounded-lg !mt-3" type="number" name="buildingid"/>
                  </label>
                  <label class="label mt-3">
                  <span>Floor</span>
                  <input class="input rounded-lg mt-3" type="number" name="floor"/>
                </label>
                <a href="/admin/ads"><button type="button" class="btn variant-filled-tertiary w-full rounded-lg mt-5">Browse</button></a>
            </div>
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label mt-3">
                <span>Texture</span>
                <input class="input rounded-lg !mt-3" type="text" name="texture"/>
                </label>
                <label class="label mt-3">
                <span>Owner</span>
                <input class="input rounded-lg mt-3" type="text" name="owner"/>
                </label>
                <button type="submit" class="btn variant-filled-primary w-full rounded-lg mt-5">Add</button>
            </div>
        </div>
    </form>

    </div>
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Exchange rates
        </h1>
        <form method="POST" action="?/eRates" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.data != true){
                toastStore.trigger({message:'Failed'});
            } else {
                toastStore.trigger({message:'Success'});
            }
            invalidateAll();
        }}}>
        <div class="grid grid-rows-2 grid-cols-3">
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label mt-3">
                <span>UK</span>
                <input class="input rounded-lg !mt-3" type="number" disabled value={data.uk}/>
                </label>
            </div>
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label mt-3">
                <span>CC</span>
                <input class="input rounded-lg !mt-3" type="number" disabled value={data.cc}/>
                </label>
            </div>
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label mt-3">
                <span>DG</span>
                <input class="input rounded-lg !mt-3" type="number" disabled value={data.dg}/>
                </label>
            </div>
            
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label">
                <input class="input rounded-lg !mt-3" type="number" value={data.uk} name="uk"/>
                </label>
            </div>
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label">
                <input class="input rounded-lg !mt-3" type="number" value={data.cc} name="cc"/>
                </label>
            </div>
            <div class="pt-3 font-medium text-small ml-3">
                <label class="label">
                <input class="input rounded-lg !mt-3" type="number" value={data.dg} name="dg"/>
                </label>
            </div>
        </div>
        
        <button type="submit" class="btn variant-filled-primary w-full rounded-lg">Update</button>
        </form>
    </div>
    
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Bans Manager
        </h1>
        <form method="POST" action="?/ban" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.data != true){
                toastStore.trigger({message:'Failed'});
            } else {
                toastStore.trigger({message:'Success'});
            }
        }}}>
            <div class="pt-3 font-medium text-small">
                <label class="label mt-3">
                <span>Email</span>
                <input class="input rounded-lg !mt-3" type="email" name="banEmail"/>
                  </label>
            </div>
            <div class="grid grid-rows-1 xl:grid-cols-2 grid-cols-2">
                <div class="pt-3 font-medium text-small mr-3">
                    <a href="/admin/bans"><button type="button" class="btn variant-filled-tertiary w-full rounded-lg mt-5">Browse</button></a>

            </div>
        <div class="pt-3 font-medium text-small ml-3">
        <button type="submit" class="btn variant-filled-primary w-full rounded-lg mt-5">Ban</button>
</div>
        </div>
    </form>

    </div>

    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Admins Manager
        </h1>
        <form method="POST" action="?/promote" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.data != true){
                toastStore.trigger({message:'Failed'});
            } else {
                toastStore.trigger({message:'Success'});
            }
        }}}>
            <div class="pt-3 font-medium text-small">
                <label class="label mt-3">
                <span>Email</span>
                <input class="input rounded-lg !mt-3" type="email" name="adminEmail"/>
                  </label>
            </div>
            <div class="grid grid-rows-1 xl:grid-cols-2 grid-cols-2">
                <div class="pt-3 font-medium text-small mr-3">
                    <a href="/admin/admins"><button type="button" class="btn variant-filled-tertiary w-full rounded-lg mt-5">Browse</button></a>

            </div>
        <div class="pt-3 font-medium text-small ml-3">
        <button type="submit" class="btn variant-filled-primary w-full rounded-lg mt-5">Promote</button>
</div>
        </div>
    </form>

    </div>

    <!--
    <div class="p-4 md:p-6 w-full md:w-3/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Your wallet
        </h1>
    </div>
    -->
</div>
<form method="POST" action="?/logout" use:enhance>
<button type="submit" class="btn variant-filled-error rounded-lg flex m-auto mt-10">Log out</button>
</form>