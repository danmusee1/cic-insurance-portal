import { z } from 'zod';

export const FormDatSchemaCourseUpdate = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  imagefile: z.any().optional().refine((file) => file instanceof File || file === undefined, 'Invalid Image file'),
  studyfile: z.any().optional().refine((file) => file instanceof File || file === undefined, 'Invalid Study file'),

});
