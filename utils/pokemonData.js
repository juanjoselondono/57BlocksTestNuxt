export default function pokemonData(name) {
    return new Promise((resolve, reject) => {
        if (name != undefined) {
            try {
                fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
                    (data) => {
                        resolve(data.json())
                    }
                )
            } catch (err) {
                console.err(err)
                reject(err)
            }
        }
    })
}
