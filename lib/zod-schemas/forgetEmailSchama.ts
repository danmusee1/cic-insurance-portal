import {z} from 'zod'

export const FormDatSchemaForget = z.object({
  userEmail:z.string().nonempty('Email is required'),
    //modules: z.array(z.string()),
    
})



/* .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  }); */

