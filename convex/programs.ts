import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("programs").collect();
  },
});

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("programs")
      .withIndex("by_status", (q) => q.eq("status", args.status as "aktif" | "verifikasi" | "monitoring" | "restorasi" | "selesai"))
      .collect();
  },
});

export const getByProvince = query({
  args: { province: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("programs")
      .withIndex("by_province", (q) => q.eq("province", args.province))
      .collect();
  },
});

export const create = mutation({
  args: {
    programId: v.string(),
    name: v.string(),
    location: v.string(),
    province: v.string(),
    area: v.string(),
    bibit: v.string(),
    status: v.union(v.literal("aktif"), v.literal("verifikasi"), v.literal("monitoring"), v.literal("restorasi"), v.literal("selesai")),
    progress: v.number(),
    started: v.string(),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("programs", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("programs"),
    name: v.optional(v.string()),
    status: v.optional(v.union(v.literal("aktif"), v.literal("verifikasi"), v.literal("monitoring"), v.literal("restorasi"), v.literal("selesai"))),
    progress: v.optional(v.number()),
    area: v.optional(v.string()),
    bibit: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const updates: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updates[key] = value;
    }
    return await ctx.db.patch(id, updates);
  },
});
