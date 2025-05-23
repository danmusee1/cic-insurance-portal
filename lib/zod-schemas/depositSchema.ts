import {z} from 'zod'

export const FormDatSchemaDeposit = z.object({
    Amount:z.string().nonempty('Amount is required'),
    PhoneNumber:z.string().nonempty('PhoneNumber is required'),
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

