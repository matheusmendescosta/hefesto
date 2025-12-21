// import { serverApi } from "@/services/server-api";
// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// const GET = async (req: NextRequest) => {
//   console.error("🔵 GET /api/products chamado");
//   const token = await getToken({ req });

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

//   if (!baseUrl) {
//     throw new Error("API_URL environment variable is not set");
//   }

//   return serverApi.get(`${baseUrl}/products`, {
//     token: token?.access_token,
//   });
// };
// export { GET };
