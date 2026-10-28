# mostafa.log

A dark, terminal-inspired cybersecurity research notebook for Mostafa Ibrahem Sayed.

## Content workflow

Articles are defined in `lib/articles.ts` for this starter version so the project works without a database or external service. Each item includes a slug, title, description, date, category, tags, status, and body sections.

- `status: 'draft'` keeps a research note out of the public homepage, archive, and static article routes.
- `status: 'demo'` keeps temporary learning content visible with a DEMO CONTENT label.
- `status: 'published'` makes a verified article public.

When the PHP2Shell research is ready, replace its content, set its status to `published`, and keep only claims supported by your evidence. For a larger content library, `lib/articles.ts` can be moved to Markdown/MDX files with the same frontmatter fields.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Deployment (GitHub Pages)

The site is exported as static files (`output: 'export'`) and deployed by `.github/workflows/deploy.yml`.

1. Create a GitHub repo named `<username>.github.io` (for example `mostafaa23.github.io`) so the site is served at `https://<username>.github.io`.
2. Push this project to the `main` branch.
3. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Every push to `main` builds and publishes the site automatically.

If the repo has any other name, the workflow sets the base path to `/<repo-name>` automatically.

To test the production build locally:

```bash
pnpm build   # output is generated in the "out" folder
```

The app has no database, authentication, or required environment variables.
