import {z} from 'zod'

export const ParameterSchema = z.object({
    tradingPair:z.string().nonempty('Your Trading Pair is required'),
    investmentAmount:z.string().nonempty('Investment Amount required'), 
    openCloseDuration:z. string().nonempty('Open and close duration is required'),
    
})

