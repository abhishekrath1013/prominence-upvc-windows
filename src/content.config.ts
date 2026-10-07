import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const specBlock = z.object({
  wallThickness: z.string().optional(),
  steelReinforcement: z.string().optional(),
  joints: z.string().optional(),
  weatherSeal: z.string().optional(),
  glazing: z.string().optional(),
  windLoad: z.string().optional(),
  locking: z.string().optional(),
  maxLeafWidth: z.string().optional(),
  openingPercent: z.string().optional(),
  configurations: z.string().optional(),
});

const seriesVariant = z.object({
  series: z.enum(['Inventa', 'Optima']),
  tagline: z.string(),
  description: z.string(),
  specs: specBlock,
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    category: z.enum(['window', 'door']),
    style: z.enum(['casement', 'sliding', 'tilt-turn', 'slide-fold']),
    title: z.string(),
    shortName: z.string(),
    heroImage: z.string(),
    whatIsIt: z.string(),
    whyChooseIt: z.string(),
    idealFor: z.array(z.string()),
    benefits: z.array(z.object({ title: z.string(), description: z.string() })),
    designOptions: z.string(),
    series: z.array(seriesVariant),
    certifications: z.array(z.string()),
    relatedFaqSlugs: z.array(z.string()).default([]),
    comparisonTraits: z.object({
      spaceSaving: z.boolean(),
      ventilation: z.boolean(),
      easyOperation: z.boolean(),
      largeOpenings: z.boolean(),
      weatherSealing: z.boolean(),
      securityLocking: z.boolean(),
    }),
  }),
});

const colours = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/colours' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['wood', 'contemporary', 'base']),
    image: z.string().optional(),
    swatchHex: z.string().optional(),
    description: z.string(),
    order: z.number(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    category: z.enum(['general', 'performance', 'maintenance', 'buying', 'technical']),
    order: z.number().default(0),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    region: z.string(),
    isHQ: z.boolean().default(false),
    intro: z.string(),
  }),
});

export const collections = { products, colours, faqs, cities };
