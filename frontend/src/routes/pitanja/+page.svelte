<script>
    import axios from "axios";
    import { page } from "$app/stores";
    import moment from "moment";

    let show

    let name = ''
    let content = ''
    let comment = ''
    let pitanjeId
    let showComment
    let file
    let image

    const showPitanje = async (id) => {
        pitanjeId = id
        comment = ''
        showComment = !showComment
    }

    export let data

    const Submit = async () => {
        const formData = new FormData()
        formData.append('file', image, image.name)
        formData.append('name', name)
        formData.append('content', content)
        const pitanje = await axios.post("http://localhost:3000/pitanje/new", formData, { withCredentials: true, 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` })
        if (pitanje) {
            const pitanja = await axios.get("http://localhost:3000/pitanje", { withCredentials: true })
            if (pitanja) {
                data.pitanja = pitanja.data
            }
        }
    }

    const Comment = async (id) => {
        const com = await axios.post("http://localhost:3000/pitanje/comment", { content: comment, pitanjeId: id }, { withCredentials: true })
        if (com) {
            const pitanja = await axios.get("http://localhost:3000/pitanje", { withCredentials: true })
            if (pitanja) {
                console.log(pitanja.data)
                data.pitanja = pitanja.data
            }
        }
    }

    const delComment = async (id) => {
        const del = await axios.post("http://localhost:3000/pitanje/delComm", { commentId: id }, { withCredentials: true })
        if (del) {
            const pitanja = await axios.get("http://localhost:3000/pitanje", { withCredentials: true })
            if (pitanja) {
                console.log(pitanja.data)
                data.pitanja = pitanja.data
            }
        }
    }

    const onFileSelected = async (e) =>{
        image = e.target.files[0];
    }

    const getUrl = (str) => {
        return `http://localhost:3000/uploads/${str}`
    }
</script>
{#if $page.data.user}
    <button on:click={() => show = !show} class="bg-gray-700 text-white absolute right-72 top-32 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">{#if !show}Novo pitanje{:else}Odustani{/if}</button>
{/if}
<div class="text-white flex flex-col items-center justify-center mt-32 gap-12">
    {#if show}
        <div class="flex justify-center items-start gap-4">
            <input bind:value={name} class="bg-transparent ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all" type="text" placeholder="Naslov pitanja">
            <textarea bind:value={content} class="bg-transparent ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all" type="text" placeholder="Pitanje"></textarea>
            <input on:change={(e)=>onFileSelected(e)} style="display:none" type="file" accept=".jpg, .jpeg, .png" bind:this={file} >
            <button on:click={()=>{file.click();}} class="ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all">Slika</button>
            <button on:click={() => Submit()} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all">Potvrdi</button>
        </div>
    {/if}
    <h1 class="uppercase text-4xl font-bold">Pitanja</h1>
    <div class="flex flex-col items-start justify-center gap-10">
        {#each data.pitanja as pitanje}
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="bg-gray-800 flex flex-col items-center justify-center p-4 max-w-5xl rounded-md gap-4">
                    <h1 class="text-center text-2xl">{pitanje.name}</h1>
                    <div class="flex justify-between items-center">
                        <p>{pitanje.content}</p>
                        <img class="max-w-xl h-auto w-56" src={getUrl(pitanje.imageUrl)} alt="Image">
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <h2>Objavio <span class="font-bold capitalize">{pitanje.username}</span> {moment(pitanje.createdAt, "YYYY-MM-DD hh:mm:ss").fromNow()}</h2>
                        {#if $page.data.user}
                            <button on:click={() => {showPitanje(pitanje.id)}} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all ml-2">{#if pitanjeId === pitanje.id && showComment}Odustani{:else}Odgovori{/if}</button>
                        {/if}
                    </div>
                </div>
                {#if pitanjeId === pitanje.id && showComment}
                    <div class="flex justify-between items-center w-full bg-gray-800 p-4 rounded-md">
                        <input bind:value={comment} class="bg-transparent ring-2 ring-gray-700 p-2 px-4 rounded-md hover:ring-gray-600 transition-all w-full" type="text" placeholder="Odgovor">
                        <button on:click={() => Comment(pitanje.id)} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all ml-4">Potvrdi</button>
                    </div>
                {/if}
                {#each pitanje.comments as comment}
                    <div class="flex flex-col justify-center items-start w-full bg-gray-800 p-4 rounded-md gap-2">
                        <p>{comment.content}</p>
                        <div class="flex justify-between items-center w-full">
                            <h1>Odgovorio: <span class="font-bold capitalize">{comment.user.username}</span> {moment(comment.createdAt, "YYYY-MM-DD hh:mm:ss").fromNow()}</h1>
                            {#if $page.data.user}
                                {#if $page.data.user.username === comment.user.username}
                                    <button on:click={() => delComment(comment.id)} class="bg-gray-700 p-2 rounded-md px-4 hover:bg-gray-600 transition-all ml-4">Izbriši</button>
                                {/if}
                            {/if}
                        </div>
                      </div>
                {/each}
            </div>
        {/each}
    </div>
</div>