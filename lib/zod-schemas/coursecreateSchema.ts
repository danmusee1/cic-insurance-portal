import { z } from 'zod';

export const FormDatSchemaCourseCreation = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.string().nonempty('Price is required'),
  imagefile: z
    .any()
    .refine((file) => file instanceof File, 'Image is required')
    .refine((file) => file.type.startsWith('image/'), 'Invalid image format')
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Image must be less than 5MB'),
  studyfile: z
    .any()
    .refine((file) => file instanceof File, 'Study file is required')
    .refine((file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type), 'Invalid study file format')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Study file must be less than 10MB'),
 /*  videofiles: z
    .array(z.any())
    .nonempty('At least one video is required')
    .refine((files) => files.every((file) => file instanceof File), 'Invalid video files')
    .refine((files) => files.every((file) => file.type.startsWith('video/')), 'Invalid video format')
    .refine((files) => files.every((file) => file.size <= 50 * 1024 * 1024), 'Each video must be less than 50MB'), */

    videofiles: z
    .array(z.instanceof(File))
    .optional()
    .refine((files: File[] | undefined) => {
      // Check if files is not undefined and has at least one file
      return files ? files.length > 0 : false;
    }, 'At least one video is required')
    .refine((files: File[] | undefined) => files?.every((file) => file instanceof File), 'Invalid video files')
    .refine((files: File[] | undefined) => files?.every((file) => file.type.startsWith('video/')), 'Invalid video format')
    .refine((files: File[] | undefined) => files?.every((file) => file.size <= 50 * 1024 * 1024), 'File size must be less than 50MB'),
});
/* export const FormDatSchemaCourseCreation = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.string().nonempty('Price is required'),
  imagefile: z.any().refine((file) => file instanceof File, 'Image is required'),
  studyfile: z.any().refine((file) => file instanceof File, 'Study is required'),
  videofile: z.any().refine((file) => file instanceof File, 'Video is required'),
}); */


