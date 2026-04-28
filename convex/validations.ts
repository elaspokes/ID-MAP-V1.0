import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("validations").collect();
  },
});

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("validations")
      .withIndex("by_status", (q) => q.eq("status", args.status as "menunggu" | "proses" | "selesai" | "ditolak"))
      .collect();
  },
});

export const listAlerts = query({
  handler: async (ctx) => {
    return await ctx.db.query("monitoringAlerts").collect();
  },
});

export const create = mutation({
  args: {
    validationId: v.string(),
    project: v.string(),
    type: v.string(),
    officer: v.string(),
    submitted: v.string(),
    photos: v.number(),
    gps: v.string(),
    survivalRate: v.string(),
    status: v.union(v.literal("menunggu"), v.literal("proses"), v.literal("selesai"), v.literal("ditolak")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("validations", args);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("validations"),
    status: v.union(v.literal("menunggu"), v.literal("proses"), v.literal("selesai"), v.literal("ditolak")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});

export const createAlert = mutation({
  args: {
    project: v.string(),
    alert: v.string(),
    severity: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("monitoringAlerts", args);
  },
});
