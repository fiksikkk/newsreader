import z from 'zod';

const FIELD_REQUIRED_STR = 'This field is required';
export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Genderless',
  'Other',
] as const;
export const STATUS_OPTIONS = ['Alive', 'Dead', 'Unknown'] as const;

export const signUpFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters')
    .trim(),

  status: z.enum(STATUS_OPTIONS, {
    required_error: FIELD_REQUIRED_STR,
    invalid_type_error: `Invalid status, must be one of the followings: ${STATUS_OPTIONS.join(
      ', ',
    )}`,
  }),

  species: z
    .string({
      invalid_type_error: 'Species must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(5, 'Minimum 5 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),

  type: z
    .string({
      invalid_type_error: 'Type must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .max(100, 'Maximum 100 characters')
    .trim(),

  gender: z.enum(GENDER_OPTIONS, {
    required_error: FIELD_REQUIRED_STR,
    invalid_type_error: `Invalid gender, must be one of the followings: ${GENDER_OPTIONS.join(
      ', ',
    )}`,
  }),

  origin_name: z
    .string({
      invalid_type_error: 'Origin location must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),

  origin_url: z
    .string({
      invalid_type_error: 'Origin location must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .refine(
      value =>
        !value ||
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
          value,
        ),
      {
        message: 'Please provide a valid URL',
      },
    ),

  location_name: z
    .string({
      invalid_type_error: 'Current location must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),

  location_url: z
    .string({
      invalid_type_error: 'Origin location must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .refine(
      value =>
        !value ||
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
          value,
        ),
      {
        message: 'Please provide a valid URL',
      },
    ),
  image: z
    .string({
      invalid_type_error: 'Origin location must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .refine(
      value =>
        !value ||
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
          value,
        ),
      {
        message: 'Please provide a valid URL',
      },
    ),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
