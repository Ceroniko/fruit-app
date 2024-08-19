import { z } from 'zod';

type BuildQueryFnConfig<TDataType> = {
  params?: Record<string, string>;
  validator?: z.ZodType<TDataType>;
};

type QueryFn<TResponseType> = (signal: AbortSignal) => Promise<TResponseType | QueryError>;

type QueryError = {
  type: ErrorType;
  message?: string;
  [errorSymbol]: true;
};

enum ErrorType {
  aborted,
  failed,
  invalidData,
  unrecognized,
}

const errorSymbol = Symbol('errorSymbol');

const buildQueryError = (type: ErrorType, message?: string): QueryError => ({ type, message, [errorSymbol]: true });

const isQueryError = (value: unknown): value is QueryError => typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, errorSymbol);
const isRequestAborted = (error: QueryError) => error.type === ErrorType.aborted;
const isRequestFailed = (error: QueryError) => error.type === ErrorType.failed;
const isResponseDataInvalid = (error: QueryError) => error.type === ErrorType.invalidData;
const isUnrecognizedError = (error: QueryError) => error.type === ErrorType.unrecognized;

const buildQueryFn = <TDataType>(url: string, config: BuildQueryFnConfig<TDataType> = {}): QueryFn<TDataType> => {
  const { params, validator } = config;

  const requestURL = new URL(url);
  requestURL.search = new URLSearchParams(params).toString();

  const headers = new Headers();

  const queryFn = async (signal: AbortSignal) => {
    try {
      const response = await fetch(requestURL, {
        signal,
        headers,
        method: 'GET',
      });

      if (!response.ok) return buildQueryError(ErrorType.failed);

      const data = await response.json();

      if (!validator) return data as TDataType;

      return validator.parse(data);
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return buildQueryError(ErrorType.aborted);

      if (e instanceof z.ZodError) return buildQueryError(ErrorType.invalidData);

      return buildQueryError(ErrorType.unrecognized, 'Something went wrong!');
    }
  };

  return queryFn;
};

export { buildQueryFn, isQueryError, isRequestAborted, isRequestFailed, isResponseDataInvalid, isUnrecognizedError };
export type { QueryFn };
