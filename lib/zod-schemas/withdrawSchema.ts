/* import {z} from 'zod' */

/* export const FormDatSchemaWithdraw = z.object({
    Amount:z.string().nonempty('Amount is required'),
    WithdraChannell:z.string().nonempty('Withdrawal chanell is required'),
    paypalEmail: z.string().email("Invalid email").optional(),
    phoneNumber: z.string().optional().refine(
      (value, context) =>
        context.parent.withdrawalChannel !== "PAYPAL" ? !!value : true,
      {
        message: "Phone number is required for non-PayPal channels",
      }
    ),
    //modules: z.array(z.string()),
    
}) */

import { z } from "zod";

export const FormDatSchemaWithdraw = z
  .object({
    Amount: z.string().nonempty("Amount is required"),
    WithdraChannell: z.string().nonempty("Withdrawal channel is required"),
    paypalEmail: z.string().email("Invalid email").optional(),
    phoneNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.WithdraChannell !== "PAYPAL" && !data.phoneNumber) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneNumber"],
        message: "Phone number is required for non-PayPal channels",
      });
    }

    if (data.WithdraChannell === "PAYPAL" && !data.paypalEmail) {
      ctx.addIssue({
         code: "custom",
        path: ["paypalEmail"],
        message: "PayPal email is required for PayPal channel",
      });
    }
  });


/* .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  }); */

