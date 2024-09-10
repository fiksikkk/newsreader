import z from 'zod';

const phoneNumberRegexp = new RegExp(
  /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
);
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
    invalid_type_error: `Invalid status, must be one of the followings: ${GENDER_OPTIONS.join(
      ', ',
    )}`,
  }),
  /*
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

  origin_link: z
    .string({
      invalid_type_error: 'Origin location link must be a link',
      required_error: FIELD_REQUIRED_STR,
    })
    .url('It must be a link')
    .min(5, 'Minimum 5 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),

  location_name: z
    .string({
      invalid_type_error: 'Current location must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),

  location_link: z
    .string({
      invalid_type_error: 'Current location link must be a link',
      required_error: FIELD_REQUIRED_STR,
    })
    .url('It must be a link')
    .min(5, 'Minimum 5 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),

  image: z
    .string({
      invalid_type_error: 'Image link must be a link',
      required_error: FIELD_REQUIRED_STR,
    })
    .url('It must be a link')
    .min(5, 'Minimum 5 characters')
    .max(100, 'Maximum 100 characters')
    .trim(),
    */
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
