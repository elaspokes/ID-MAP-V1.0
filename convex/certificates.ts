import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("certificates").collect();
  },
});

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("certificates")
      .withIndex("by_status", (q) => q.eq("status", args.status as "diterbitkan" | "draft" | "menunggu"))
      .collect();
  },
});

export const create = mutation({
  args: {
    certificateId: v.string(),
    recipient: v.string(),
    program: v.string(),
    type: v.string(),
    bibit: v.number(),
    carbon: v.string(),
    issued: v.string(),
    status: v.union(v.literal("diterbitkan"), v.literal("draft"), v.literal("menunggu")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("certificates", args);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("certificates"),
    status: v.union(v.literal("diterbitkan"), v.literal("draft"), v.literal("menunggu")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
