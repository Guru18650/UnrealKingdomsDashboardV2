<script>
  import FormInput from "$lib/components/formInput.svelte";
  export let data;
	import { enhance } from '$app/forms';

  import { getToastStore } from '@skeletonlabs/skeleton';
  const toastStore = getToastStore();

  import * as EmailValidator from 'email-validator';
  let form, email;

  function verifyData(){
    if(email == null)
      toastStore.trigger({message: 'Fill in all the data'})
    else if(!EmailValidator.validate(email))
      toastStore.trigger({message: 'Your email is not valid'})
    else
      form.requestSubmit()
  }
</script>

<title>Forgot</title>
<div class="p-6 card !bg-transparent rounded-2xl shadow-4xl sm:max-w-md m-auto md:mt-32 mt-32">
  <h1 class="text-xl leading-tight tracking-tight md:text-2xl">
      Forgot password
  </h1>
  <form method="POST" bind:this={form}
	use:enhance={() => {
		return ({result, update }) => {
      toastStore.trigger({message: 'Success, check your email'})

		};
	}}>
  <div class="pt-3 font-medium text-small">
    <label class="label mt-3">
        <span>Email adress</span>
        <input class="input rounded-lg" type="text" name="email" bind:value={email}/>
      </label>
  </div>
  <button type="button" on:click={verifyData} class="btn variant-filled-primary w-full rounded-lg mt-5">Reset</button>
</form>
  
</div>
