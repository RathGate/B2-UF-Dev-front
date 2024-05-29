export const getCurrentUser = async (endpoint, token) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'user',
        () => $fetch(`${endpoint}/users/current`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    )

    if(error.value) return { error }
    return { data }
}


export const loginUser = async (endpoint, userCrendentials) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'login',
        () => $fetch(`${endpoint}/users/login`, {
            method: 'POST',
            body: userCrendentials
        })
    )
    if(error.value) return { error }
    return { data }
}

export const registerUser = async (endpoint, userCrendentials) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'register',
        () => $fetch(`${endpoint}/users/register`, {
            method: 'POST',
            body: userCrendentials
        })
    )

    if(error.value) return { error }
    return { data }
}

export const getUserById = async (endpoint, token, id) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'user',
        () => $fetch(`${endpoint}/users/${id}/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    )

    if(error.value) return { error }
    return { data }
}
export const updateUser = async (endpoint, token, id, user) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'user',
        () => $fetch(`${endpoint}/users/${id}/admin`, {
            method: 'PATCH',
            body: user,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    )

    if(error.value) return { error }
    return { data }
}


export const deleteUser = async (endpoint, token, id) => {
    const { data, pending, error, refresh } = await useAsyncData(
        'user',
        () => $fetch(`${endpoint}/users/${id}/`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    )

    if(error.value) return { error }
    return { data }
}

