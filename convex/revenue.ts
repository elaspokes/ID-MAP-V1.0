import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("revenueData").collect();
  },
});

export const create = mutation({
  args: {
    month: v.string(),
    value: v.number(),
    year: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("revenueData", args);
  },
});
