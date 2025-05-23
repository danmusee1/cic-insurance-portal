import {z} from 'zod'

export const FormDatSchemaPaymentOption = z.object({
    paymentOption:z.string().nonempty('Payment option is required'),
    phoneNumber:z.string().nonempty('phoneNumber option is required'),
    //modules: z.array(z.string()),
    
})