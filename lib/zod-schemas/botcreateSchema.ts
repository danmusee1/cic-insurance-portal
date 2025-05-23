import { z } from 'zod';

export const FormDatSchemaBotCreation = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  winLossRatio: z.string().nonempty('LossWin Ratio is required'),
  platform:z.string(),
  price: z.string().nonempty('Price is required'),
  xmlfile: z.any().refine((file) => file instanceof File, 'XML is required'),
  imagefile: z.any().refine((file) => file instanceof File, 'Image is required'),
  studyfile: z.any().refine((file) => file instanceof File, 'Study is required'),
  videofile: z.any().refine((file) => file instanceof File, 'Video is required'),
});
