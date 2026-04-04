import type { CreateAxiosDefaults } from 'axios'

export const axiosConfig: CreateAxiosDefaults = {
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	baseURL: "http://localhost:8000/api/v1/",
	maxRedirects: 5
}
