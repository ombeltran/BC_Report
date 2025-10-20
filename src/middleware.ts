// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const secretToken = process.env.NEXT_PUBLIC_TOKEN_SECRET

  // Validación de existencia del token secreto
  if (!secretToken) {
    console.warn('TOKEN_SECRET no está definido en las variables de entorno')
    return NextResponse.json({ error: 'Configuración inválida del servidor' }, { status: 500 })
  }

  // Protección de rutas específicas
  if (pathname.startsWith('/api/users') || pathname.startsWith('/api/production')) {
    const authHeader = request.headers.get('authorization')

    // Validación del formato y contenido del header
    if (!authHeader?.startsWith('Bearer ') || authHeader.split(' ')[1] !== secretToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

// Configuración del matcher para aplicar el middleware solo a ciertas rutas
export const config = {
  matcher: ['/api/users/:path*', '/api/production/:path*']
}
