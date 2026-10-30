# Mostafa's Cybersecurity Blog

**Website:** `mostafa.log` · **Framework:** Next.js · **Hosting:** GitHub Pages

A dark, terminal-inspired cybersecurity research notebook documenting penetration testing, vulnerability research, CTF writeups, and security engineering by **Mostafa Ibrahem Sayed**.

## Live Site

[https://mostafaa23.github.io](https://mostafaa23.github.io)

## About

This blog documents my journey in cybersecurity, including penetration testing, API security, cloud security, vulnerability research, and hands-on security experiments.

The goal is to maintain a technical notebook of practical findings, reproducible tests, and security research, with an emphasis on documenting evidence and explaining the methodology behind each result.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** TypeScript-based article registry
- **Hosting:** GitHub Pages
- **Deployment:** GitHub Actions
- **Output:** Static HTML export

## Project Structure

```text
mostafaa23.github.io/
├── app/                      # Pages and layouts
├── components/               # Reusable UI components
├── lib/
│   └── articles.ts           # Article content and metadata
├── public/                   # Static assets and images
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── next.config.mjs           # Next.js configuration
├── package.json              # Project scripts and dependencies
├── pnpm-lock.yaml            # Dependency lockfile
├── tsconfig.json             # TypeScript configuration
└── README.md
```

## Content Workflow

Articles are currently managed in `lib/articles.ts`. Each article includes metadata such as its slug, title, description, date, category, tags, status, and body sections.

Supported article statuses:

- **`draft`** — Keeps research notes out of the public homepage, archive, and static article routes.
- **`demo`** — Displays temporary learning content with a `DEMO CONTENT` label.
- **`published`** — Makes a verified article publicly available.

Before publishing research, verify the technical claims and ensure that the content reflects the available evidence.

For a larger article library, the current TypeScript-based content system can be migrated to Markdown or MDX.

## Adding a New Article

1. Open `lib/articles.ts`.
2. Add an article using the existing article structure.
3. Provide its slug, title, description, date, category, tags, status, and body sections.
4. Use `draft` while researching.
5. Change the status to `published` when the article is ready.
6. Commit and push your changes to the `main` branch.

Example metadata:

```ts
{
  slug: "your-article-slug",
  title: "Your Article Title",
  description: "A concise summary of your research.",
  date: "2026-10-30",
  category: "API Security",
  tags: ["API", "Security", "Research"],
  status: "draft",
}
```

Use the existing article definitions in `lib/articles.ts` as the source of truth for the complete article format.

## Research Topics

- API Security and Authorization
- Broken Object Level Authorization (BOLA / IDOR)
- Cloud Security and IAM
- Web Application Security
- Penetration Testing
- CTF Writeups
- Vulnerability Research
- Security Automation

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test the production build locally:

```bash
pnpm build
```

The static website is generated in the `out/` directory.

## Deployment

The website is deployed to GitHub Pages using GitHub Actions.

1. Push changes to the `main` branch.
2. GitHub Actions installs dependencies and builds the Next.js application.
3. The build generates static files in `out/`.
4. GitHub Actions deploys the generated files to GitHub Pages.

To configure deployment, open your repository's **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source.

## Author

**Mostafa Ibrahem Sayed**

- **GitHub:** [@mostafaa23](https://github.com/mostafaa23)
- **Focus:** Cybersecurity, API Security, Cloud Security, and Vulnerability Research

---

*Built with curiosity, documented with evidence, and driven by a passion for cybersecurity.*
