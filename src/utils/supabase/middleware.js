import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          console.log('Setting cookies:', cookiesToSet)
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
    // No user, redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith('/login')) {
    // User is logged in and trying to access login page, redirect to /trivia
    const url = request.nextUrl.clone()
    url.pathname = '/trivia'
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith('/winners')) {
    // User is logged in and trying to access admin page, looks for it comparing email with users table email in the database and then checks if the role is 'admin' else redirect to /trivia
    const { data: users, error } = await supabase.from('users').select('*').eq('email', user.email)
    if (error) {
      console.error(error)
    }
    if (users[0].role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/trivia'
      return NextResponse.redirect(url)
    }
  }


  return supabaseResponse
}