import axios from "axios";

export const branchInstance = axios.create({
    baseURL : `${import.meta.env.VITE_APP_API_V1_BASE_URL}/branches`
})

export const cetagoryInstance = axios.create({
    baseURL : `${import.meta.env.VITE_APP_API_V1_BASE_URL}/categories`
})

export const subCetagoryInstance = axios.create({
    baseURL : `${import.meta.env.VITE_APP_API_V1_BASE_URL}/sub-categories`
})

export const manufacturerInstance = axios.create({
    baseURL : `${import.meta.env.VITE_APP_API_V1_BASE_URL}/manufacturers`
})

export const vendorInstance = axios.create({
    baseURL : `${import.meta.env.VITE_APP_API_V1_BASE_URL}/vendors`
})

export const grnInstance = axios.create({
    baseURL : `${import.meta.env.VITE_APP_API_V1_BASE_URL}/grns`
})


