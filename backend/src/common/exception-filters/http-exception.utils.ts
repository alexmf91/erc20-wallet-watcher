import type { HttpException } from '@nestjs/common';

export const getExceptionErrorMessage = (
  exception: HttpException | any,
): string => {
  if (exception.response && typeof exception.response === 'object') {
    if (Array.isArray(exception.response.message)) {
      return exception.response.message.join(', ');
    }
    return exception.response.message || 'Internal server error';
  }
  return exception.message || 'Internal server error';
};

export const getExceptionError = (exception: HttpException | any): string => {
  if (exception.response && typeof exception.response === 'object') {
    return exception.response.error || 'Internal server error';
  }
  return exception.message || 'Internal server error';
};
