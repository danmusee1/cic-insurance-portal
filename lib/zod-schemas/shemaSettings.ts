import {z} from 'zod'

export const FormDatSchemaSettings = z.object({
    email:z.string().nonempty('Email is required'),
    firstName:z.string().nonempty('First Name is required'),
    lastName:z.string().nonempty('Last Name is required'),
    phoneNumber:z.string().nonempty('Phone Number is required'),
})

    




/* .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  }); */

