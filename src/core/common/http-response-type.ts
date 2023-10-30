import { HttpResponseType } from '@Utility/Types';

export const ResponseType: HttpResponseType = {
  INFO: 'info',
  REDIRECT: 'redirect',
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
} as const;
