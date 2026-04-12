import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

// ---------- Projects ----------
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      status: z.enum(['active', 'completed', 'archived']),
      featured: z.boolean().default(false),
      date: z.date(),
      tags: z.array(z.string()).optional(),
      tech: z.array(z.string()).optional(),
      collaborators: z.array(z.string()).optional(),
      github: z.url().optional(),
      demo: z.url().optional(),
      paper: z.url().optional(),
      cover: image().optional(),
    }),
});

// ---------- Publications ----------
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    venue_short: z.string().optional(),
    year: z.number().int().min(1900).max(2100),
    date: z.date(),
    type: z.enum([
      'conference',
      'journal',
      'workshop',
      'preprint',
      'thesis',
    ]),
    status: z.enum([
      'published',
      'accepted',
      'under_review',
      'in_preparation',
    ]),
    abstract: z.string(),
    pdf: z.url().optional(),
    arxiv: z.string().optional(),
    doi: z.string().optional(),
    code: z.url().optional(),
    bibtex: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    award: z.string().optional(),
  }),
});

export const collections = { projects, publications };
