import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const productValidationSchema = (t: TFunction) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t('product_name') + ' ' + t('required'))
      .min(2, t('min', { count: 2 })),
    price: yup
      .number()
      .typeError(t('price') + ' ' + t('required'))
      .required(t('price') + ' ' + t('required'))
      .positive(t('price') + ' > 0'),
    description: yup
      .string()
      .required(t('description') + ' ' + t('required'))
      .min(5, t('min', { count: 5 })),
    category: yup.string().required(t('category') + ' ' + t('required')),
  });
