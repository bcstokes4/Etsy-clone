

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
    const res = await fetch(`api/restaurants/${id}`, {
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
        default:
            return state
    }
}

export default productsReducer