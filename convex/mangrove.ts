import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listSpecies = query({
  handler: async (ctx) => {
    return await ctx.db.query("mangroveSpecies").collect();
  },
});

export const listGrowthRecords = query({
  handler: async (ctx) => {
    return await ctx.db.query("growthRecords").collect();
  },
});

export const createSpecies = mutation({
  args: {
    name: v.string(),
    localName: v.string(),
    count: v.string(),
    area: v.string(),
    survivalRate: v.number(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mangroveSpecies", args);
  },
});

export const createGrowthRecord = mutation({
  args: {
    location: v.string(),
    species: v.string(),
    height: v.string(),
    diameter: v.string(),
    age: v.string(),
    health: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("growthRecords", args);
  },
});
