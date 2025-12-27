# TODO
# 📋 ToDo App - Comparação de Arquiteturas Frontend

## 📚 Informações Acadêmicas

**Disciplina:** Engenharia de Software  
**Tema:** Comparação entre MVC, MVP e MVVM no Frontend, integrados a Backends REST e Reativos  

---

## 🎯 Objetivo do Trabalho

Este trabalho tem como objetivo comparar arquiteturas de frontend **(MVC, MVP e MVVM)** e estilos arquiteturais de backend **(REST tradicional e arquitetura reativa/event-driven)**, analisando:

- ✅ Separação de responsabilidades
- ✅ Impacto da arquitetura do backend sobre o frontend
- ✅ Esforço de implementação
- ✅ Clareza do fluxo de dados
- ✅ Facilidade de manutenção

> **Importante:** O foco não é estética nem complexidade funcional, mas **arquitetura**.

---

## 🚀 Escopo Funcional

Implementação de um **ToDo App simples** contendo:

- ✏️ Listagem de tarefas
- ➕ Criação de tarefa
- 🗑️ Exclusão de tarefa

> Não é necessário autenticação, paginação ou UI sofisticada!

---

## 🏗️ Estrutura do Projeto

### Frontend - Três Implementações

O mesmo ToDo App foi implementado **três vezes** em React, usando:

1. **MVC** (Model-View-Controller) - [`mvc-architecture/`](mvc-architecture/)
2. **MVP** (Model-View-Presenter) - [`mvp-architecture/`](mvp-architecture/)
3. **MVVM** (Model-View-ViewModel) - [`mvvm-architecture/`](mvvm-architecture/)

Cada implementação possui:
- Estrutura de pastas separando responsabilidades
- Código funcional e executável
- Integração com o backend Supabase

```
mvc-architecture/
├── src/
│   ├── config/         # Configurações (Supabase client)
│   │   └── supabaseClient.js
│   ├── model/          # Lógica de dados e comunicação com API
│   │   └── todoModel.js
│   ├── view/           # Componentes React (UI)
│   │   └── TodoView.jsx
│   ├── controller/     # Lógica de controle e coordenação
│   │   └── todoController.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

```
mvp-architecture/
├── src/
│ ├── config/         # Configurações (Supabase client)
│ │ └── supabaseClient.js
│ ├── model/          # Lógica de dados e comunicação com API
│ │ └── todoModel.js
│ ├── view/           # Componentes React (UI)
│ │ └── TodoView.jsx
│ ├── presenter/     # Lógica de controle e coordenação
│ │ └── todoPresenter.js
│ ├── App.jsx
│ └── main.jsx
└── package.json
```

```
mvvm-architecture/

```

---

## 🔧 Backend - Supabase

### Backend A - REST Tradicional (Pull)

- Frontend realiza chamadas HTTP explícitas (GET, POST, DELETE)
- Atualizações ocorrem apenas após requisição manual
- Implementação padrão do Supabase usando REST API

### Backend B - Reativo / Event-driven (Push)

- Frontend recebe atualizações automaticamente via **Realtime Subscriptions**
- Usa WebSockets para comunicação bidirecional
- Mudanças no banco de dados são propagadas instantaneamente para todas as instâncias conectadas

#### Configuração do Backend Reativo

Para ativar o modo reativo no Supabase:
1. Acesse a tabela `todos` no Supabase Dashboard
2. Ative a opção **"Realtime"** na tabela
3. No frontend, configure a inscrição Realtime usando `supabase.channel()`

> **Obs.:** Para alternar entre REST e Reativo, basta ativar/desativar a opção Realtime no Supabase.

---

## ⚙️ Configuração e Instalação (mvc-architecture)

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn
- Conta no Supabase

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/HielSaraiva/project-todo-list-react.git
cd project-todo-list-react
```

### 2️⃣ Instalar dependências

```bash
cd mvc-architecture
npm install
```
ou
```bash
cd mvp-architecture
npm install
```

Se houver problemas, execute:

```bash
rm -rf node_modules package-lock.json
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto `mvc-architecture/` ou `mvp-architecture/`:

```env
VITE_SUPABASE_URL=<SUA_URL_DO_SUPABASE>
VITE_SUPABASE_API_KEY=<SUA_CHAVE_ANON_DO_SUPABASE>
```

> ⚠️ **Substitua os valores acima** pelas credenciais do seu projeto Supabase.

### 4️⃣ Executar o projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 🗄️ Estrutura do Banco de Dados

### Tabela `todos`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | integer | ID único (auto-incremento) |
| `title` | text | Título da tarefa |
| `created_at` | timestamp | Data de criação |

**Configurações importantes:**
- RLS (Row Level Security) desativado para fins de teste
- Realtime habilitado para suporte a atualizações em tempo real

---

## 🧪 Testando as Requisições HTTP

### GET - Listar todas as tarefas

```bash
curl -i -H "Accept: application/json" \
  -H "apikey: <SUA_CHAVE_API>" \
  -H "Authorization: Bearer <SUA_CHAVE_API>" \
  "<SUA_URL_SUPABASE>/rest/v1/todos"
```

### POST - Criar nova tarefa

```bash
curl -i -X POST \
  -H "Content-Type: application/json" \
  -H "apikey: <SUA_CHAVE_API>" \
  -H "Authorization: Bearer <SUA_CHAVE_API>" \
  -d '{"title":"Teste via curl"}' \
  "<SUA_URL_SUPABASE>/rest/v1/todos"
```

### DELETE - Deletar tarefa

```bash
curl -i -X DELETE \
  -H "apikey: <SUA_CHAVE_API>" \
  -H "Authorization: Bearer <SUA_CHAVE_API>" \
  "<SUA_URL_SUPABASE>/rest/v1/todos?id=eq.1"
```

---

## 🎥 Demonstração do Comportamento
[![Vídeo da demonstração](https://img.youtube.com/vi/q1Na-ZnYeis/0.jpg)](https://www.youtube.com/watch?v=q1Na-ZnYeis)

### REST (Pull)
1. Abrir duas instâncias da aplicação
2. Criar/deletar uma tarefa em uma instância
3. **Resultado:** A outra instância só atualiza após refresh manual

### Reativo (Push)
1. Abrir duas instâncias da aplicação
2. Criar/deletar uma tarefa em uma instância
3. **Resultado:** A outra instância atualiza automaticamente, sem ação do usuário

---

## 📦 Tecnologias Utilizadas

### Frontend
- **React** 18+ com Vite
- **JavaScript** (ES6+)
- Hooks: `useState`, `useEffect`, `useCallback`

### Backend
- **Supabase** (PostgreSQL + REST API + Realtime)
- WebSockets (via Supabase Realtime)

### Ferramentas
- WebStorm IDE
- Postman (testes de API)
- npm (gerenciador de pacotes)

---

## 👥 Equipe

- Hiel Saraiva
- Roberta Alanis
- Charles Lima

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina de Engenharia de Software.
