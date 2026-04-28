import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password: _p, ...rest }) => rest);
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getByRole = query({
  args: { role: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role as "admin" | "verifikator" | "kontributor" | "csr_partner"))
      .collect();
  },
});

export const login = mutation({
  args: { email: v.string(), password: v.string(), role: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user || user.password !== args.password || user.role !== args.role) {
      return null;
    }
    return { email: user.email, role: user.role, name: user.name };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("verifikator"), v.literal("kontributor"), v.literal("csr_partner")),
    status: v.union(v.literal("aktif"), v.literal("nonaktif"), v.literal("pending")),
    joined: v.string(),
    kontribusi: v.optional(v.string()),
    password: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("verifikator"), v.literal("kontributor"), v.literal("csr_partner"))),
    status: v.optional(v.union(v.literal("aktif"), v.literal("nonaktif"), v.literal("pending"))),
    kontribusi: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const updates: Record<string, string> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updates[key] = value;
    }
    return await ctx.db.patch(id, updates);
  },
});
