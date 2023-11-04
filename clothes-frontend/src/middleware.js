export { default } from "next-auth/middleware";

export const config = { matcher: ["/men/shirt", "/profile/:path*"] };
