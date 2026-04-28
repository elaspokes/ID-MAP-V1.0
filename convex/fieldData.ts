import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("fieldData").collect();
  },
});

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("fieldData")
      .withIndex("by_status", (q) => q.eq("status", args.status as "terkirim" | "draft" | "revisi"))
      .collect();
  },
});

export const create = mutation({
  args: {
    fieldId: v.string(),
    location: v.string(),
    date: v.string(),
    species: v.string(),
    bibit: v.number(),
    height: v.string(),
    survivalRate: v.string(),
    salinity: v.string(),
    photos: v.number(),
    status: v.union(v.literal("terkirim"), v.literal("draft"), v.literal("revisi")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("fieldData", args);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("fieldData"),
    status: v.union(v.literal("terkirim"), v.literal("draft"), v.literal("revisi")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
