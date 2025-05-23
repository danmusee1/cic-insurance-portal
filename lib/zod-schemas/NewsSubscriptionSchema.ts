import {z} from 'zod'

export const FormDatSchemaNewsSubscription = z.object({
  email:z.string().nonempty('Email is required'),
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

