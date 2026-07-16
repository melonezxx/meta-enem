# Meta ENEM

Plataforma completa de estudos para o ENEM. Organize seus estudos, acompanhe seu progresso e conquiste sua aprovação.

## Funcionalidades

- 5 matérias com 130+ tópicos organizados em módulos
- Checklists inteligentes com progresso automático
- Anotações por tópico com salvamento automático
- Timer Pomodoro integrado
- Plano de estudos semanal personalizado
- Gráficos de progresso detalhados
- Marcação de dificuldade por tópico
- Favoritos e marcadores
- Autenticação via Supabase
- Modo escuro

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Storage)
- Zustand (estado global)
- Recharts (gráficos)
- Framer Motion (animações)
- Radix UI (componentes acessíveis)

## Pré-requisitos

- Node.js 18+
- Conta no Supabase (gratuita)

## Configuração

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env.local` com as variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

4. Inicie o servidor: `npm run dev`

## Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. No Authentication > Providers, habilite "Email" com "Confirm email" desabilitado
3. Copie as credenciais do projeto para o `.env.local`

## Build

```bash
npm run build
```

## Deploy

O deploy pode ser feito na [Vercel](https://vercel.com) ou qualquer plataforma que suporte Next.js.

## Licença

Todos os direitos reservados.
