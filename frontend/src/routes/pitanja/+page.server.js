export const load = async ({ fetch }) => {
    const data = await fetch("http://localhost:3000/pitanje")
    const pitanja = await data.json()

    return {
        pitanja
    }
}