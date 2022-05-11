import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const PRIVATE_KEY = 'THIS_IS_YOUR_API_KEY';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
