<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import { loggedIn } from '../stores';

    let logged = false;

    onMount(() => {
        loggedIn.subscribe(v => {
            logged = v;
        });
    });
</script>

<nav class="flex justify-between px-20 items-center bg-gray-900 border-b-2 border-gray-800 text-white py-4 w-full text-center">
    <a href="/" class="uppercase font-bold text-2xl">
        Rješenja
    </a>
    <div class="flex justify-center items-center gap-10 text-xl">
        {#if !logged}
            <a href="/prijava" class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">Prijava</a>
            <a href="/registracija" class="ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all">Registracija</a>
        {:else}
            <a href="/moj-profil" class="ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all">Moj profil</a>
           <form action="/odjava" method="POST">
               <button class="hover:ring-2 hover:ring-gray-600 p-2 px-4 rounded-md transition-all">Odjava</button>
           </form>
        {/if}
           <a href="/pitanja" class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">Pitanja</a>
    </div>
</nav>
<slot />