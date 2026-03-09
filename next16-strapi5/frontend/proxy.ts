import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { STRAPI_BASE_URL } from "./lib/strapi"

const protectedRoutes = ['/dashboard']
const guestOnlyRoutes = ['/sign-in', '/sign-up']

function checkIsProtectedRoute(path: string) {
  return protectedRoutes.includes(path)
}

function checkIsGuestOnlyRoute(path: string) {
  return guestOnlyRoutes.includes(path)
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  const isProtectedRoute = checkIsProtectedRoute(currentPath)
  const isGuestOnlyRoute = checkIsGuestOnlyRoute(currentPath)

  if (!isProtectedRoute && !isGuestOnlyRoute) return NextResponse.next()

  try {
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    if (!jwt && isProtectedRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    if (!jwt) return NextResponse.next()

    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }
    })
    const userResponse = await response.json()
    console.log(userResponse)

    if (!response.ok || !userResponse) {
      if (isGuestOnlyRoute) return NextResponse.next()
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (isGuestOnlyRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()

  } catch (error) {
    console.error('Error verifying user authentication:', error)
    if (isGuestOnlyRoute) return NextResponse.next()
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/dashboard/:path*",
  ]
}
