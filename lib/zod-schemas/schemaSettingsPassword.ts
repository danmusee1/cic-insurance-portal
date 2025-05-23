import {z} from 'zod'

export const FormDatSchemaSettingsPassword = z.object({
    oldPassword:z.
    string()
    .nonempty('password is required')
    .min(6,{message:'Password must be at least 6 characters long'}),
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

    




/* .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  }); */

