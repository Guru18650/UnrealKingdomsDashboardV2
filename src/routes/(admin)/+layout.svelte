<script lang='ts'>
    import './app.postcss';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { storeTheme } from '$lib/stores';
    import { browser } from '$app/environment';
    import { invalidateAll } from '$app/navigation';

    initializeStores();

  </script>
    
    <slot/>

<Toast/>
