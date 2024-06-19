import { NextRequest, NextResponse } from "next/server"

// Supported locales
const locales = ["en", "fi"]

// Function to get the preferred locale from the request headers
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")

  if (!acceptLanguage) return "en" // Default locale if none is provided

  // Extract and sort languages by quality value
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const parts = lang.split(";q=")
      return { locale: parts[0], quality: parseFloat(parts[1] || "1") }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find the first supported locale
  for (const lang of languages) {
    if (locales.includes(lang.locale)) {
      return lang.locale
    }
  }

  return "en"
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  // Get preferred locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Only run on the root (/) URL
    "/",
    // Ensure that _next/static, _next/image, images, icons, and fonts are ignored
   "/((?!_next/static|_next/image|images|icons|fonts).*)",
  ],
}
