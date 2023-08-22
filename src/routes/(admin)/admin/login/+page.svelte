<script>
  import FormInput from "$lib/components/formInput.svelte";
  export let data;
	import { enhance } from '$app/forms';
  import { getToastStore } from '@skeletonlabs/skeleton';
  const toastStore = getToastStore();
  import * as EmailValidator from 'email-validator';
  let form, email, pass;

  function verifyData(){
    if(pass == null || email == null)
      toastStore.trigger({message: 'Fill in all the data'})
    else if(!EmailValidator.validate(email))
      toastStore.trigger({message: 'Your email is not valid'})
    else
      form.requestSubmit()
  }
</script>

<title>Login</title>
<div class="p-6 card !bg-transparent rounded-2xl shadow-4xl sm:max-w-md m-auto md:mt-64 mt-32">
  <h1 class="text-xl leading-tight tracking-tight md:text-2xl">
     Enter admin credentials
  </h1>
  <form method="POST" bind:this={form}
	use:enhance={() => {
		return ({result, update }) => {
      if(result.data == "fail"){
        toastStore.trigger({message: 'Wrong email or password'})
			  update({ reset: false });}
        else{
          window.location.href = "/admin";
        }
		};
	}}>
  <div class="pt-3 font-medium text-small">
    <label class="label mt-3">
        <span>Email adress</span>
        <input class="input rounded-lg" type="text" name="email" bind:value={email}/>
      </label>
      <label class="label mt-3">
      <span>Password</span>
      <input class="input rounded-lg" type="password" name="pass" bind:value={pass}/>
    </label>
  </div>
  <button type="button" on:click={verifyData} class="btn variant-filled-primary w-full rounded-lg mt-5">Log in</button>
</form>
</div>
