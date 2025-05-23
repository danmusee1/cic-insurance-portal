import {z} from 'zod'

export const FormDatSchemaWalletName = z.object({
  name:z.string().nonempty('Wallet Name is required'),
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

