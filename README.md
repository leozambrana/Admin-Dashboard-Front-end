# AdminDash - Dashboard Administrativo

Dashboard administrativo para gerenciamento de usuários, planos e métricas, simulando um SaaS real.

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwindcss)

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** (componentes modernos)
- **TanStack Query** (React Query)
- **Zustand** (gerenciamento de estado)
- **API Routes** (mock API integrada)

## 📁 Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Grupo de rotas de autenticação
│   │   └── login/          # Página de login
│   ├── (dashboard)/        # Grupo de rotas do dashboard
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── users/          # Gerenciamento de usuários
│   │   └── plans/          # Planos
│   ├── api/                # API Routes (mock)
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── plans/
│   │   ├── projects/
│   │   └── users/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                 # shadcn/ui
│   ├── layout/             # Sidebar, Header
│   └── common/             # Loading, EmptyState, ErrorState
│
├── hooks/                  # React Query hooks
├── services/               # API client
├── stores/                 # Zustand stores
├── types/                  # TypeScript types
├── utils/                  # Funções utilitárias
└── providers/              # React providers
```

## 🎯 Funcionalidades

### 🔐 Autenticação

- Tela de login elegante
- Validação de formulário
- Proteção de rotas (mock)
- Sessão com cookies

### 👥 Usuários

- Listagem com paginação
- Busca por nome/email
- Filtro por status (ativo/inativo)
- CRUD completo

### 💳 Planos

- Free / Pro / Enterprise
- Vinculação com usuários
- Badges de status

### 📊 Dashboard

- Cards de métricas
- Indicadores de crescimento
- Loading/Empty/Error states

## 🔧 Instalação

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔑 Credenciais de Demo

```
Email: admin@example.com
Senha: admin123
```

## 📝 API Endpoints

| Endpoint               | Método           | Descrição             |
| ---------------------- | ---------------- | --------------------- |
| `/api/auth/login`      | POST             | Login                 |
| `/api/auth/logout`     | POST             | Logout                |
| `/api/auth/me`         | GET              | Usuário atual         |
| `/api/users`           | GET/POST         | Listar/Criar usuários |
| `/api/users/:id`       | GET/PATCH/DELETE | Usuário específico    |
| `/api/plans`           | GET              | Listar planos         |
| `/api/dashboard/stats` | GET              | Estatísticas          |

## 🚀 Deploy

Este projeto está pronto para deploy na Vercel:

1. Push para o GitHub
2. Conecte à Vercel
3. Deploy automático

---

Desenvolvido com ❤️ usando Next.js e shadcn/ui
