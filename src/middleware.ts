// import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
// import type { NextRequest } from 'next/server';
// import createMiddleware from 'next-intl/middleware';

// import { AppConfig } from './utils/AppConfig';

// const intlMiddleware = createMiddleware({
//   locales: AppConfig.locales,
//   localePrefix: AppConfig.localePrefix,
//   defaultLocale: AppConfig.defaultLocale,
// });

// export default authMiddleware({
//   publicRoutes: (req: NextRequest) =>
//     !req.nextUrl.pathname.includes('/dashboard'),

//   beforeAuth: (req) => {
//     // Execute next-intl middleware before Clerk's auth middleware
//     return intlMiddleware(req);
//   },

//   // eslint-disable-next-line consistent-return
//   afterAuth(auth, req) {
//     // Handle users who aren't authenticated
//     if (!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }
//   },
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
// import type { NextRequest } from 'next/server';

export function middleware() {
  // doing
}

export const config = {
  // doing
};
