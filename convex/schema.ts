import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("verifikator"), v.literal("kontributor"), v.literal("csr_partner")),
    status: v.union(v.literal("aktif"), v.literal("nonaktif"), v.literal("pending")),
    joined: v.string(),
    kontribusi: v.optional(v.string()),
    password: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_status", ["status"]),

  programs: defineTable({
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
  })
    .index("by_programId", ["programId"])
    .index("by_status", ["status"])
    .index("by_province", ["province"]),

  transactions: defineTable({
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
  })
    .index("by_transactionId", ["transactionId"])
    .index("by_status", ["status"])
    .index("by_donorEmail", ["donorEmail"]),

  mangroveSpecies: defineTable({
    name: v.string(),
    localName: v.string(),
    count: v.string(),
    area: v.string(),
    survivalRate: v.number(),
    status: v.string(),
  })
    .index("by_name", ["name"]),

  growthRecords: defineTable({
    location: v.string(),
    species: v.string(),
    height: v.string(),
    diameter: v.string(),
    age: v.string(),
    health: v.string(),
  })
    .index("by_location", ["location"]),

  validations: defineTable({
    validationId: v.string(),
    project: v.string(),
    type: v.string(),
    officer: v.string(),
    submitted: v.string(),
    photos: v.number(),
    gps: v.string(),
    survivalRate: v.string(),
    status: v.union(v.literal("menunggu"), v.literal("proses"), v.literal("selesai"), v.literal("ditolak")),
  })
    .index("by_validationId", ["validationId"])
    .index("by_status", ["status"]),

  fieldData: defineTable({
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
  })
    .index("by_fieldId", ["fieldId"])
    .index("by_status", ["status"]),

  certificates: defineTable({
    certificateId: v.string(),
    recipient: v.string(),
    program: v.string(),
    type: v.string(),
    bibit: v.number(),
    carbon: v.string(),
    issued: v.string(),
    status: v.union(v.literal("diterbitkan"), v.literal("draft"), v.literal("menunggu")),
  })
    .index("by_certificateId", ["certificateId"])
    .index("by_status", ["status"]),

  donations: defineTable({
    email: v.string(),
    whatsapp: v.string(),
    packageType: v.string(),
    amount: v.number(),
    magicLinkToken: v.string(),
    status: v.union(v.literal("pending"), v.literal("completed")),
    createdAt: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_token", ["magicLinkToken"]),

  monitoringAlerts: defineTable({
    project: v.string(),
    alert: v.string(),
    severity: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    date: v.string(),
  })
    .index("by_severity", ["severity"]),

  revenueData: defineTable({
    month: v.string(),
    value: v.number(),
    year: v.optional(v.number()),
  }),
});
