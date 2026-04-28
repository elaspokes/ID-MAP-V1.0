import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("transactions").collect();
  },
});

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .withIndex("by_status", (q) => q.eq("status", args.status as "berhasil" | "pending" | "gagal"))
      .collect();
  },
});

export const create = mutation({
  args: {
    transactionId: v.string(),
    donorName: v.string(),
    donorEmail: v.optional(v.string()),
    amount: v.number(),
    amountFormatted: v.string(),
    method: v.string(),
    program: v.string(),
    date: v.string(),
    status: v.union(v.literal("berhasil"), v.literal("pending"), v.literal("gagal")),
    whatsapp: v.optional(v.string()),
    packageType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", args);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("transactions"),
    status: v.union(v.literal("berhasil"), v.literal("pending"), v.literal("gagal")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
