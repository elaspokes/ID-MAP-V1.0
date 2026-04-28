import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("donations").collect();
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("donations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});

export const getByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("donations")
      .withIndex("by_token", (q) => q.eq("magicLinkToken", args.token))
      .first();
  },
});

export const create = mutation({
  args: {
    email: v.string(),
    whatsapp: v.string(),
    packageType: v.string(),
    amount: v.number(),
    magicLinkToken: v.string(),
    status: v.union(v.literal("pending"), v.literal("completed")),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("donations", args);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("donations"),
    status: v.union(v.literal("pending"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
