<script lang="ts">
  import { getToastStore } from '@skeletonlabs/skeleton';
  const toastStore = getToastStore();
	import { enhance } from '$app/forms';
  
  import FormInput from "$lib/components/formInput.svelte";
  import * as EmailValidator from 'email-validator';
	import { apiFetch } from '$lib/api';
  
  export let data;

  let compare = true, pass1, pass2, form;
  function comparePassword() {
      compare = pass1 === pass2
  }
  async function verifyData(){
    if(pass1 == null || pass2 == null)
      toastStore.trigger({message: 'Fill in all the data'})
    else if(!compare)
      toastStore.trigger({message: 'Your password do not match'})
    else if(pass1.length<8)
      toastStore.trigger({message: 'Your password is too short'})
    else
      form.requestSubmit()

  }

</script>
<title>Reset</title>

<div class="p-6 card !bg-transparent rounded-2xl shadow-4xl sm:max-w-md m-auto md:mt-32 mt-16">
    <h1 class="text-xl leading-tight tracking-tight md:text-2xl">
        Reset password
    </h1>
    <form method="POST" bind:this={form}
    use:enhance={() => {
      return ({result, update }) => {
            window.location.href = "/login";
      };
    }}>
    <div class="pt-3 font-medium text-small">
        <label class="label mt-3">
          <span>New password</span>
          <input class={compare ? 'input rounded-lg':'variant-soft-error input rounded-lg'} type="password" name="pass1" bind:value={pass1} on:input={comparePassword}/>
        </label>
        <label class="label mt-3">
          <span>Repeat new password</span>
          <input class={compare ? 'input rounded-lg':'variant-soft-error input rounded-lg'} type="password" name="pass2" bind:value={pass2}  on:input={comparePassword}/>
        </label>
    </div>
    <button type="button" on:click={verifyData} class="btn variant-filled-primary w-full rounded-lg mt-5" >Reset</button>
    </form>
  </div>