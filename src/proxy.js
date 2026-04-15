import { updateSession } from '@/utils/supabase/proxy'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Next.js 16+ Proxy Convention
 * Replaces the deprecated 'middleware' convention.
 */
export async function proxy(request) {
  const supabaseResponse = await updateSession(request)

  const { pathname } = request.nextUrl

  // Protected routes: start with /admin but is NOT /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this matcher to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
