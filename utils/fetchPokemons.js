export default function fetchPokemon() {
    return new Promise((resolve, reject) => {
        //?limit=100
        try {
            fetch('https://pokeapi.co/api/v2/pokemon').then((data) => {
                resolve(data.json())
            })
        } catch (err) {
            console.err(err)
            reject(err)
        }
    })
}
