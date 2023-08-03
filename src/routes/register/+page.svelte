<script lang="ts">
  import { Toast, toastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  import FormInput from "$lib/components/formInput.svelte";
  import * as EmailValidator from 'email-validator';
	import { apiFetch } from '$lib/api';
  

  let compare = true, pass1, pass2, email, uname, form;
  function comparePassword() {
      compare = pass1 === pass2
  }

  async function emailValidate(){
    const payload = {email:email}
    var resp = await apiFetch('/users/checkEmail',payload);
    return resp.data;
  }

  async function usernameValidate(){
    const payload = {username:uname}
    var resp = await apiFetch('/users/checkUsername',payload);
    return resp.data;
  }

  async function verifyData(){
    if(pass1 == null || pass2 == null || email == null || uname == null)
      toastStore.trigger({message: 'Fill in all the data'})
    else if(!EmailValidator.validate(email))
      toastStore.trigger({message: 'Your email is not valid'})
    else if(uname.length<6)
      toastStore.trigger({message: 'Your username is too short'})
    else if(!compare)
      toastStore.trigger({message: 'Your password do not match'})
    else if(pass1.length<8)
      toastStore.trigger({message: 'Your password is too short'})
    else if(await emailValidate())
      toastStore.trigger({message: 'Account with this email exists'})
    else if(await usernameValidate())
      toastStore.trigger({message: 'Account with this username exists'})
    else
      form.requestSubmit()

  }

</script>
<title>Register</title>

<div class="p-6 card !bg-transparent rounded-2xl shadow-4xl sm:max-w-md m-auto md:mt-32 mt-16">
    <h1 class="text-xl leading-tight tracking-tight md:text-2xl">
        Create your account
    </h1>
    <form method="post" bind:this={form}>
    <div class="pt-3 font-medium text-small">
      <label class="label mt-3">
        <span>Email adress</span>
        <input class="input rounded-lg" type="email" name="email" bind:value={email}/>
      </label>
        <label class="label mt-3">
          <span>Username</span>
          <input class="input rounded-lg" type="text" name="uname" bind:value={uname}/>
        </label>
        <label class="label mt-3">
          <span>Password</span>
          <input class={compare ? 'input rounded-lg':'variant-soft-error input rounded-lg'} type="password" name="pass1" bind:value={pass1} on:input={comparePassword}/>
        </label>
        <label class="label mt-3">
          <span>Repeat password</span>
          <input class={compare ? 'input rounded-lg':'variant-soft-error input rounded-lg'} type="password" name="pass2" bind:value={pass2}  on:input={comparePassword}/>
        </label>
        <!--<FormInput type="password" label="Repeat password" name="pass2"/>-->
    </div>
    <button type="button" on:click={verifyData} class="btn variant-filled-primary w-full rounded-lg mt-5" >Sign up</button>
    </form>
    <p class="text-sm font-light mt-2">
      Already have an account? <a href="login" class="font-medium text-primary-500 hover:underline">Sign in</a>
    </p>
  </div>

<Toast background="variant-filled-error"/>
