import {z} from 'zod'

export const FormDatSchemaEmail = z.object({
  userEmail:z.string().nonempty('Email is required'),
  termsConditions:z.boolean()
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

