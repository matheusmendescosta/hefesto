import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { mountUrlParams } from "./utils";

type HttpMethodType = "GET" | "POST" | "PATCH" | "DELETE";

export const pageParams = (req: NextRequest): [string, string] => {
  const page = req.nextUrl.searchParams.get("page");

  if (!page) return ["", ""];

  if (isNaN(parseInt(page))) return ["", ""];

  return ["page", page];
};

const apiHandler = async <T>({
  url,
  token,
  data,
  method,
  headers,
  cache,
}: {
  url: string;
  token?: string | null | undefined;
  //eslint-disable-next-line
  data?: any;
  method: HttpMethodType;
  headers?: HeadersInit;
  cache?: RequestCache;
}) => {
  const response = await fetch(url, {
    method: method,
    headers: { ...headers, Authorization: token ?? "" },
    body: data,
    // @ts-ignore-next-line - Types outdated
    duplex: "half",
    cache: cache,
  });

  try {
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json<T>(responseData, {
        status: response.status,
        headers: { "Data-Travel": response.headers.get("Data-Travel") ?? "" },
      });
    } else {
      switch (response.status) {
        case 422:
          const responseData = await response.json();
          return NextResponse.json<T>(responseData, {
            status: 422,
            headers: {
              "Data-Travel": response.headers.get("Data-Travel") ?? "",
            },
          });
        default:
          return NextResponse.json<T>({} as T, {
            status: response.status,
            headers: {
              "Data-Travel": response.headers.get("Data-Travel") ?? "",
            },
          });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { errors: { internal_service_error: [] } },
      {
        status: 500,
        headers: { "Data-Travel": response.headers.get("Data-Travel") ?? "" },
      }
    );
  }
};

const defaultHeaders = { "Content-Type": "application/json" };
const defaultSerializer = (data: string) => JSON.stringify(data);

export const serverApi = {
  get: <T>(
    url: string,
    options?: {
      headers?: HeadersInit;
      token?: string | null;
      cache?: RequestCache;
      params?: [string, string | number][];
    }
  ) => {
    return apiHandler<T>({
      url: `${url}${mountUrlParams(options?.params)}`,
      method: "GET",
      headers: options?.headers ?? defaultHeaders,
      token: options?.token,
      cache: options?.cache,
    });
  },

  post: (
    url: string,
    //eslint-disable-next-line
    data?: any,
    options?: {
      headers?: HeadersInit;
      token?: string | null;
      //eslint-disable-next-line
      serializer?: (dataToSerialize: any) => any;
    }
  ) => {
    const dataToSend = options?.serializer
      ? options?.serializer(data)
      : defaultSerializer(data);

    return apiHandler({
      url: `${url}`,
      method: "POST",
      headers: options?.headers ?? defaultHeaders,
      token: options?.token,
      data: dataToSend,
    });
  },

  patch: (
    url: string,
    //eslint-disable-next-line
    data?: any,
    options?: {
      headers?: HeadersInit;
      token?: string | null;
      //eslint-disable-next-line
      serializer?: (dataToSerialize: any) => any;
    }
  ) => {
    const dataToSend = options?.serializer
      ? options?.serializer(data)
      : defaultSerializer(data);

    return apiHandler({
      url: `${url}`,
      method: "PATCH",
      headers: options?.headers ?? defaultHeaders,
      token: options?.token,
      data: dataToSend,
    });
  },

  delete: (
    url: string,
    options?: { headers?: HeadersInit; token?: string | null }
  ) =>
    apiHandler({
      url: `${url}`,
      method: "DELETE",
      headers: options?.headers ?? defaultHeaders,
      token: options?.token,
    }),
};
