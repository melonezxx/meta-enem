import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const requestedNext = requestUrl.searchParams.get('next')
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/dashboard'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL('/recuperar-senha?error=link-invalido', requestUrl.origin))
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
