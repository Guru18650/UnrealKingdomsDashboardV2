<script>
import { invalidateAll } from '$app/navigation';
if (typeof window !== 'undefined') {
invalidateAll();
document.cookie
}
export let data;

</script>

<div class="flex justify-center text-center h-2/3 items-center flex-col">
	<div class="md:text-9xl text-4xl">Welcome to <br><a href="https://unrealkingdoms.com" class="text-secondary-500">Unreal Kingdoms</a></div>
	<div class="md:mt-20 mt-10 md:text-5xl text-2xl uppercase">
		{#if data.j}
			<a href="/dashboard" class="text-primary-500">open dashboard</a>
		{:else}
			<a href="/register" class="text-primary-500">create account</a>
		{/if}
		<br><p class="md:mt-5">to begin your journey</p></div>
</div>
