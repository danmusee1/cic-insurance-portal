import {z} from 'zod'

export const FormDatSchemaRegester = z.object({
    firstName:z.string().nonempty('First Name is required'),
    middleName:z.string().nonempty('Middle Name is required'), 
    lastName:z.string().nonempty('Last Name is required'), 
    email:z.string().nonempty('Email is required'), 
    address:z.string().nonempty('Address is required'), 
     phoneNumber:z.string().nonempty('Phone number is required'), 
    password:z.
    string()
    .nonempty('password is required')
    .min(6,{message:'Password must be at least 6 characters long'}),

    passwordConfirm: z
    .string()
    .nonempty('Password confirmation is required')
    .min(6, { message: 'Password must be at least 6 characters long' })
    
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});





