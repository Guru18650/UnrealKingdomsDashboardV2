<script>
    export let data;
	import { enhance } from '$app/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import { invalidate, invalidateAll } from '$app/navigation';

</script>
<div class="p-6 w-2/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
    <a href="/admin"><button class="float-left btn variant-filled-error rounded">Back</button></a>
    <h1 class="text-xl leading-tight tracking-tight md:text-3xl">
        Unreal Kingdoms Ads Manager
    </h1>
</div>
<div class="p-4 md:p-6 w-full md:w-2/4 !bg-transparent rounded-2xl shadow-4xl m-auto md:mt-10 mt-5 text-center">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
                <tr class="!text-center">
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {#each data.admins as row, i}
                <tr>
                    <td>{row.user_id}</td>
                    <td>{row.email}</td>
                    <td>{row.username}</td>
                    <td class="!p-2"><form method="POST"
                        use:enhance={({form}) => {return ({result, update }) => {
                            if(result.data != true){
                                toastStore.trigger({message:'Failed'});
                            } else {
                                toastStore.trigger({message:'Success'});
                                form.reset();
                                invalidateAll();
                            }
                        }}}><input type="hidden" value={row.email} name="email"/><button class="btn variant-filled-error rounded w-full">Demote</button></td>

                </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3">Total Count</th>
                    <td class="text-center" >{data.admins.length}</td>
                </tr>
            </tfoot>
        </table>
    </div>
    
</div>
