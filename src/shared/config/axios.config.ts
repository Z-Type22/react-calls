import type { CreateAxiosDefaults } from 'axios'

export const axiosConfig: CreateAxiosDefaults = {
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	baseURL: `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_BACKEND_API_VERSION}/`,
	maxRedirects: 5
}
