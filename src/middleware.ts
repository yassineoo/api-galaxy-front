import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to this page if not authenticated
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect all routes under /dashboard
};
