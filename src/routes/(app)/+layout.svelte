<script lang='ts'>
  export let data;
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import './app.postcss';
	import { AppShell, AppBar} from "@skeletonlabs/skeleton";
  
  import { Toast, getToastStore } from '@skeletonlabs/skeleton';
  import { initializeStores } from '@skeletonlabs/skeleton';
  initializeStores();

</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-surface-100-800-token" shadow="shadow-xl">
      <svelte:fragment slot="lead">
        <a href="/" class="text-xl uppercase">Unreal Kingdoms</a>
      </svelte:fragment>
      {#if data.logged}
      <div class="md:text-white text-transparent">Logged in as {data.email}</div>
      {/if}
      <svelte:fragment slot="trail">
        {#if data.logged}
        <a class="btn variant-filled-secondary" href="dashboard">Dashboard</a>
        <a class="btn variant-filled-error md:w-auto w-20" href="logout">Log out</a>
        {:else}
        <a class="btn variant-filled-secondary rounded-lg" href="login">Log in</a>
        {/if}
      </svelte:fragment>
    </AppBar>  
  </svelte:fragment>
  <slot />
</AppShell>
<Toast background="variant-filled-error"/>
