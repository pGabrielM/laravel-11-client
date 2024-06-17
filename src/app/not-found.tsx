'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h2>Pagina não encontrada!</h2>
      <p>
        Não foi possivel encontrar este recurso, clique abaixo para voltar para
        pagina inical
      </p>
      <Button
        className="mt-8 w-20"
        type="submit"
        onClick={() => router.push('/')}
      >
        Voltar
      </Button>
    </div>
  )
}
