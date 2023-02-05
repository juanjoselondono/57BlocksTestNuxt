export default function fetchPokemon(limit, offset) {
    return new Promise((resolve, reject) => {
        //?limit=100
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then((data) => {
                resolve(data.json())
            })
        } catch (err) {
            console.err(err)
            reject(err)
        }
    })
}
