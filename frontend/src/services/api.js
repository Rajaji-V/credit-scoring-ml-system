import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const creditService = {
    predict: async (data) => {
        try {
            const response = await apiClient.post('/predict', data);
            return response.data;
        } catch (error) {
            console.error('Error during credit prediction:', error);
            throw error;
        }
    },

    getHealth: async () => {
        const response = await apiClient.get('/health');
        return response.data;
    }
};

export default apiClient;
