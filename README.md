# Super Dev TCC — Feliks

Aplicação web para apoiar a gestão de uma operação imobiliária, reunindo em um único painel informações sobre imóveis, clientes, corretores e condomínios. O front-end foi desenvolvido com Angular e integra uma API HTTP para os dados do sistema e o Supabase para autenticação.

## Funcionalidades

- **Dashboard:** visão geral de imóveis, clientes e corretores, com indicadores e gráficos.
- **Imóveis:** consulta, filtros e ordenação; criação, edição e remoção de imóveis; suporte a casas, apartamentos e terrenos; gerenciamento de imagens.
- **Clientes:** consulta e gerenciamento de clientes, incluindo a classificação por perfil.
- **Corretores:** consulta e gerenciamento dos corretores.
- **Condomínios:** consulta e gerenciamento dos condomínios.
- **Autenticação:** login com e-mail e senha pelo Supabase Auth e proteção das rotas internas.

## Tecnologias

- [Angular 22](https://angular.dev/) e TypeScript
- SCSS para estilos
- Angular Router e Reactive Forms
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript) para autenticação
- [Chart.js](https://www.chartjs.org/) para os gráficos do dashboard
- RxJS, `ngx-mask` e Angular HttpClient

## Pré-requisitos

- Node.js e npm instalados.
- Acesso a um projeto Supabase configurado para autenticação.
- A API HTTP utilizada pelo front-end em execução e acessível pelo navegador. Por padrão, o endereço configurado é `http://localhost:8000`.

## Como executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/Carlos-EF/super-dev-tcc-ng.git
   cd super-dev-tcc-ng
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as integrações no arquivo `src/environments/environments.ts`:

   - `apiUrl`: URL base da API HTTP. O valor inicial é `http://localhost:8000`.
   - `supabaseUrl`: URL do seu projeto Supabase.
   - `supabaseKey`: chave pública (publishable/anon) apropriada para uso no cliente.

   A API deve estar em execução e o projeto Supabase deve estar configurado para permitir a autenticação usada pela aplicação. Não coloque chaves secretas ou a chave `service_role` do Supabase no código do front-end.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

5. Abra [http://localhost:4200](http://localhost:4200) no navegador.

O servidor de desenvolvimento recarrega a aplicação quando os arquivos-fonte são alterados.

## Organização do projeto

```text
src/
├── app/
│   ├── components/   # Componentes compartilhados, como sidebar, topbar e toast
│   ├── core/         # Recursos centrais, incluindo guards de autenticação
│   ├── models/       # Interfaces e modelos TypeScript
│   ├── pages/        # Páginas de login, dashboard e áreas de gestão
│   └── services/     # Comunicação HTTP com a API
├── assets/           # Recursos estáticos
└── environments/    # Configuração dos serviços externos
```

## Observações

- O front-end consome a API configurada em `apiUrl`; iniciar apenas o Angular não inicia essa API.
- Ajuste as configurações de ambiente para os serviços que serão usados no seu ambiente local.

---

Desenvolvido como projeto acadêmico (TCC).
# Tcc