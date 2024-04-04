# [Tasks](https://tasks.krumb.it/)

A small but effective todo list app with an emphasis on the back-end.

## Features ✅ 
- NextUI + Tailwind for *clean* UI
- Authentication with Clerk
- Whitelist authorization with Clerk Webhooks + Supabase
- Type-safe and secure Supabase DB access with Drizzle ORM and Next.js server actions
- State management with React Query and Zustand

## Installation ⚙️
If you wish to locally host a version of this app
### Requirements
* `git` command line ([Windows](https://git-scm.com/download/win) | [Linux](https://git-scm.com/download/linux) | [macOS](https://git-scm.com/download/mac)) installed
* `node` [Version 18.17](https://nodejs.org/en) or later installed
* `bun` ([macOS | Linux](https://bun.sh/docs/installation)) installed
  * Using bun through WSL will not work due to how Husky is setup. Sorry!

> Note: Although the Bun CLI and package manager are the ones used, Next.js requires you to have Node installed on your system - that is why both it and Bun appear in system requirements.
### Instructions
1. Clone the repository
```sh
git clone https://github.com/Krumbit/tasks.git
```
2. Install dependencies
```sh
bun install
```
3. [Create a Supabase project](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) and assign appropriate environment variables
4. [Create a Clerk project](https://clerk.com/docs/quickstarts/nextjs) and assign appropriate environment variables
5. [Create a Clerk `user.created` webhook](https://clerk.com/docs/integrations/webhooks/overview) and assign the appropriate environment variable
6. Start dev server
```sh
bun dev
```

## To-Do / Ideas 📝
- [ ] More intuitive UI spanning the whole viewport rather than a small part
- [ ] Due dates
- [ ] Selectable statuses (i.e priorities, progress, etc.)
- [ ] Extendable task types
- [ ] Animation after marking task as complete
- [ ] Make all server actions optimistically update