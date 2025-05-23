import { z } from 'zod';

export const FormDatSchemaBotUpdate = z.object({
  name: z.string(),
  description: z.string(),
  winLossRatio: z.string(),
  price: z.string(),
  platform:z.string(),
    imagefile: z.any().optional().refine((file) => file instanceof File || file === undefined, 'Invalid Image file'),
  xmlfile: z.any().optional().refine((file) => file instanceof File || file === undefined, 'Invalid XML file'),
  studyfile: z.any().optional().refine((file) => file instanceof File || file === undefined, 'Invalid Study file'),
  videofile: z.any().optional().refine((file) => file instanceof File || file === undefined, 'Invalid Video file'),
});
