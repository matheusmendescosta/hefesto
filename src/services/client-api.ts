import { signOut } from "next-auth/react";
import {
  ApiForbiddenError,
  ApiInternalServerError,
  ApiNotFoundError,
  ApiUnauthorizedError,
  ApiUnknownError,
  ApiUnprocessableContentError,
} from "./api";
import { mountUrlParams } from "./utils";

const apiHandler = <T>({
  url,
  method,
  data,
  headers,
}: {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  //eslint-disable-next-line
  data?: any;
  headers?: HeadersInit;
}) => {
  return new Promise<{
    data: T;
    response: Response;
  }>(async (resolve, reject) => {
    const response = await fetch(`/${url}`, {
      method: method,
      headers: headers,
      body: data,
      //eslint-disable-next-line
      // @ts-ignore-next-line - Types outdated
      duplex: "half",
    });

    if (response.ok) {
      const receivedData = await response.json();
      resolve({
        data: receivedData,
        response,
      });
    } else {
      switch (response.status) {
        case 422:
          const receivedData = await response.json();
          if (receivedData["errors"]) {
            reject(
              new ApiUnprocessableContentError(
                "cannot process this request due to invalid params",
                receivedData["errors"]
              )
            );
          } else {
            reject(
              new ApiUnprocessableContentError(
                "cannot process this request due to invalid params",
                { unknown_error: receivedData }
              )
            );
          }
          break;
        case 401:
          signOut();
          reject(
            new ApiUnauthorizedError(
              "cannot process this request due to unauthorized access"
            )
          );
        case 403:
          reject(
            new ApiForbiddenError(
              "cannot process this request due to forbidden access"
            )
          );
        case 404:
          reject(
            new ApiNotFoundError(
              "cannot process this request due to not found any resource"
            )
          );
        case 500:
          reject(
            new ApiInternalServerError(
              "cannot process this request due to a error on the server"
            )
          );
        default:
          reject(
            new ApiUnknownError(
              "cannot process this request due to a unknown error"
            )
          );
      }
    }
  });
};

const defaultHeaders = { "Content-Type": "application/json" };
const defaultSerializer = (data: string) => JSON.stringify(data);

export const clientApi = {
  get: <T>(
    url: string,
    options?: { headers?: HeadersInit; params?: [string, string | number][] }
  ) => {
    return apiHandler<T>({
      url: `${url}${mountUrlParams(options?.params)}`,
      method: "GET",
      headers: options?.headers ?? defaultHeaders,
    });
  },

  post: <T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    options?: {
      headers?: HeadersInit;
      //eslint-disable-next-line
      serializer?: (dataToSerialize: any) => any;
    }
  ) => {
    const dataToSend = options?.serializer
      ? options?.serializer(data)
      : defaultSerializer(data);
    return apiHandler<T>({
      url,
      method: "POST",
      headers: options?.headers ?? defaultHeaders,
      data: dataToSend,
    });
  },

  patch: <T>(
    url: string,
    //eslint-disable-next-line
    data?: any,
    options?: {
      headers?: HeadersInit;
      //eslint-disable-next-line
      serializer?: (dataToSerialize: any) => any;
    }
  ) => {
    const dataToSend = options?.serializer
      ? options?.serializer(data)
      : defaultSerializer(data);
    return apiHandler<T>({
      url,
      method: "PATCH",
      headers: options?.headers ?? defaultHeaders,
      data: dataToSend,
    });
  },

  delete: <T>(url: string, options?: { headers?: HeadersInit }) =>
    apiHandler<T>({
      url,
      method: "DELETE",
      headers: options?.headers ?? defaultHeaders,
    }),
};
