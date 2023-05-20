<script>
    import axios from "axios";
    import {goto} from "$app/navigation";
    import { loggedIn } from '../../stores';

    let korisnickoIme = ''
    let lozinka = ''
    const Prijava = async () => {
        const data = await axios.post("http://localhost:3000/auth/prijava", { korisnickoIme, lozinka },
            { withCredentials: true }
        )
        if (data.status === 201) {
            loggedIn.set(true);
            await goto("/pitanja")
        }
    }
</script>

<div class="text-white flex flex-col items-center justify-center mt-32 gap-12">
    <h1 class="uppercase text-4xl font-bold">Prijava</h1>
    <form class="flex flex-col justify-center items-center gap-7 text-xl">
        <input bind:value={korisnickoIme} class="bg-transparent ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all" type="text" placeholder="Korisničko ime">
        <input bind:value={lozinka} class="bg-transparent ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all" type="password" placeholder="Lozinka">
        <button on:click={() => Prijava()} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all w-full" type="submit">Prijavi se</button>
    </form>
</div>