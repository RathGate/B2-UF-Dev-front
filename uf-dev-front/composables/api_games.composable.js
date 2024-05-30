export const getGameById = async (endpoint, id) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'game',
        () => $fetch(`${endpoint}/games/${id}/`, {
            method: 'GET'
        })
    )

    if(error.value) return { error }
    return { data }
}

export const getAllGames = async (endpoint) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'users',
        () => $fetch(`${endpoint}/games`, {
            method: 'GET'
        })
    )

    if(error.value) return { error }
    return { data }
}

export const getUserGamesById = async (endpoint, id) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'userGameById',
        () => $fetch(`${endpoint}/games/user/${id}/`, {
            method: 'GET'
        })
    )

    if(error.value) return { error }
    return { data }
}

export const getGamePlayersById = async (endpoint, id) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'gamePlayersById',
        () => $fetch(`${endpoint}/games/${id}/players`, {
            method: 'GET'
        })
    )

    if(error.value) return { error }
    return { data }
}

