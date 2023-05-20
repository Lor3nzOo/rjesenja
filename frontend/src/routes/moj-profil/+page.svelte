<script>
    import axios from "axios";
    import { page } from "$app/stores";

    let show

    let newUsername = ''

    export let data

    const Submit = async () => {
        const data = await axios.post("http://localhost:3000/auth/username", { newUsername, username: $page.data.user.username }, { withCredentials: true })
    }

    const Delete = async (pitanjeId) => {
        const pitanje = await axios.post("http://localhost:3000/pitanje/del", { pitanjeId }, { withCredentials: true })
        if (pitanje) {
            data.res = data.res.filter((pitanj) => pitanj.id !== pitanjeId)
        }
    }
</script>

<div class="text-white flex flex-col items-center justify-center mt-32 gap-12">
    <h1 class="uppercase text-4xl font-bold">Moj Profil</h1>
    <button on:click={() => show = !show} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">Promijeni korisničko ime</button>
    {#if show}
        <div class="flex justify-center items-center gap-4">
            <input bind:value={newUsername} class="bg-transparent ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all" type="text" placeholder="Novo korisničko ime">
            <button on:click={() => Submit()} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">Potvrdi</button>
        </div>
    {/if}
    <h2 class="uppercase text-2xl font-bold">Postavljena pitanja</h2>
    <div class="flex flex-col items-start justify-center gap-10">
        {#each data.res as pitanje}
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="bg-gray-800 flex flex-col items-center justify-center p-4 max-w-5xl rounded-md gap-4">
                    <h1 class="text-center text-2xl">{pitanje.name}</h1>
                    <p>{pitanje.content}</p>
                    <div class="flex justify-between items-center w-full">
                        <button on:click={() => Delete(pitanje.id)} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">Izbriši Pitanje</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>