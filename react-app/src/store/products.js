

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT'
const RECEIVE_PRODUCT = 'products/RECEIVE_PRODUCT'
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT'

export const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
})

export const receiveProduct = (product) => ({
    type: RECEIVE_PRODUCT,
    product
})

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
})

export const removeProduct = (id) => ({
    type: REMOVE_PRODUCT,
    id
})

// PRODUCT IMAGE THUNKS
export const fetchEditProductImage = (productId, imageId, payload) => async (dispatch) => {
    const res = await fetch(`api/products/${productId}/images/${imageId}`, {
        method: "POST",
        body: payload
    })
    const data = await res.json()
    if (res.ok){
        return data
    }
    // return data
}
// THUNKS

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch('api/products')
    const data = await res.json()
    dispatch(loadProducts(data))
}

export const fetchCreateProduct = (payload) => async (dispatch) => {
    const res = await fetch('api/products', {
        method: "POST",
        body: payload
    })
    const data = await res.json()
    if (res.ok){
        dispatch(receiveProduct(data))
        return data
    }
    // return data
}

export const fetchUpdateProduct = (productId, payload) => async (dispatch) => {
    const res = await fetch(`api/products/${productId}`, {
        method: "POST",
        body: payload
    })
    const data = await res.json()
    if (res.ok){
        dispatch(updateProduct(data))
    }
    return data
}

export const fetchDeleteProduct = (id) => async (dispatch) => {
    const res = await fetch(`api/products/${id}`, {
        method: "DELETE"
    })
    if (res.ok) dispatch(removeProduct(id))

    else {
        return res.json()
    }
}

const productsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            const productsState = {}
            action.products.Products.forEach((product) => {
                productsState[product.id] = product
            })
            return productsState
        case UPDATE_PRODUCT:
            return {...state, [action.product.id]: action.product}
        case REMOVE_PRODUCT:
            const newState = {...state}
            delete newState[action.id]
        default:
            return state
    }
}

export default productsReducer