import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en-US', 'es-MX', 'es-US', 'en-MX']
const defaultLocale = 'en-US'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  const localeValue = acceptLanguage ? acceptLanguage.split(',')[0] : defaultLocale
  return locales.includes(localeValue) ? localeValue : defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname is root '/'
  if (pathname === '/') {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Check if pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Optional: Match the root path
    '/'
  ],
}