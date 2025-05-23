import {z} from 'zod'

export const FormDatSchemaLogin = z.object({
    email:z.string().nonempty('email is required'),
    
    password:z.
    string()
    .nonempty('password is required')
    .min(6,{message:'Password must be at least 6 characters long'}),

    
})



/* .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  }); */

