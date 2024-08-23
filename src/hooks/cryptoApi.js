import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'coinrankingd2be2519f9e543479bf4f9f058bc373ebe50c193dc2af2ed',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://api.coinranking.com/v2';

const createRequest = (url, params = {}) => ({ url, params })

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers: cryptoApiHeaders }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: ({ count, timePeriod = '24h', offset = 0, tag }) => createRequest('/coins', { limit: count.toString(), timePeriod: timePeriod, offset: offset.toString(), 'tags[0]': tag })
        }),
        getCrypto: builder.query({
            query: ({ coinId, timePeriod = '24h' }) => createRequest(`/coin/${coinId}`, { timePeriod: timePeriod })
        }),
        getCryptoRefetch: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getStats: builder.query({
            query: () => createRequest('/stats')
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod = '24h' }) => createRequest(`/coin/${coinId}/history`, { timePeriod: timePeriod })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosQuery, useGetStatsQuery, useGetCryptoHistoryQuery, useGetCryptoQuery, useGetCryptoRefetchQuery } = cryptoApi