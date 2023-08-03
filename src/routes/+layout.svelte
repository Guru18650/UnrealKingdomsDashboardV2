<script lang='ts'>
  export let data;
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Avatar, AppRail, AppRailTile, AppRailAnchor } from "@skeletonlabs/skeleton";
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
        <a class="btn variant-filled-secondary" href="login">Log in</a>
        {/if}
      </svelte:fragment>
    </AppBar>  
  </svelte:fragment>
  <slot />
</AppShell>
