export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== null ? 
    JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    return userInfo
}

export const fetchCart = () => {
    const cartInfo = localStorage.getItem('cartItems') !== null ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

    return cartInfo
}