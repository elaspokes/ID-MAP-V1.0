import { mutation } from "./_generated/server";

export const seedAll = mutation({
  handler: async (ctx) => {
    const existingUsers = await ctx.db.query("users").first();
    if (existingUsers) return "Database already seeded";

    // Users
    const usersData = [
      { name: "Admin ID-MAP", email: "admin@id-map.co.id", role: "admin" as const, status: "aktif" as const, joined: "1 Jan 2024", password: "admin123" },
      { name: "Bambang Sudirjo", email: "verifikator@id-map.co.id", role: "verifikator" as const, status: "aktif" as const, joined: "5 Mar 2024", password: "verifikator123" },
      { name: "Andi Pratama", email: "andi@email.com", role: "kontributor" as const, status: "aktif" as const, joined: "15 Jan 2024", kontribusi: "Rp 1,2 M" },
      { name: "Sari Wulandari", email: "sari@email.com", role: "verifikator" as const, status: "aktif" as const, joined: "22 Feb 2024" },
      { name: "Dewi Lestari", email: "dewi@email.com", role: "kontributor" as const, status: "nonaktif" as const, joined: "10 Apr 2024", kontribusi: "Rp 450.000" },
      { name: "Rudi Hermawan", email: "rudi@email.com", role: "kontributor" as const, status: "aktif" as const, joined: "18 Mei 2024", kontribusi: "Rp 2,8 M" },
      { name: "Nina Safitri", email: "nina@email.com", role: "admin" as const, status: "aktif" as const, joined: "1 Jan 2024" },
      { name: "Dedi Mulyadi", email: "dedi@email.com", role: "verifikator" as const, status: "pending" as const, joined: "24 Mei 2024" },
      { name: "Rina Agustina", email: "rina@email.com", role: "kontributor" as const, status: "aktif" as const, joined: "8 Mar 2024", kontribusi: "Rp 780.000" },
    ];
    for (const u of usersData) await ctx.db.insert("users", u);

    // Programs
    const programsData = [
      { programId: "PRG-001", name: "Restorasi Teluk Bintuni", location: "Teluk Bintuni", province: "Papua Barat", area: "450 Ha", bibit: "250.000", status: "aktif" as const, progress: 75, started: "Jan 2024", latitude: -2.1234, longitude: 133.2345 },
      { programId: "PRG-002", name: "Desa Timbulsloko", location: "Demak", province: "Jawa Tengah", area: "180 Ha", bibit: "180.000", status: "verifikasi" as const, progress: 43, started: "Feb 2024", latitude: -6.8975, longitude: 110.6383 },
      { programId: "PRG-003", name: "TN Sembilang", location: "TN Sembilang", province: "Sumatera Selatan", area: "620 Ha", bibit: "320.000", status: "aktif" as const, progress: 80, started: "Mar 2024", latitude: -2.3456, longitude: 104.5678 },
      { programId: "PRG-004", name: "Kecamatan Kwandang", location: "Kwandang", province: "Gorontalo Utara", area: "150 Ha", bibit: "150.000", status: "aktif" as const, progress: 40, started: "Apr 2024", latitude: 0.5678, longitude: 122.3456 },
      { programId: "PRG-005", name: "Teluk Balikpapan", location: "Balikpapan", province: "Kalimantan Timur", area: "280 Ha", bibit: "95.000", status: "monitoring" as const, progress: 62, started: "Jan 2024" },
      { programId: "PRG-006", name: "Segara Anakan", location: "Cilacap", province: "Jawa Tengah", area: "200 Ha", bibit: "120.000", status: "restorasi" as const, progress: 58, started: "Mar 2024", latitude: -7.6789, longitude: 108.8901 },
    ];
    for (const p of programsData) await ctx.db.insert("programs", p);

    // Transactions
    const txData = [
      { transactionId: "TRX-20240524-001", donorName: "Andi Pratama", donorEmail: "andi@email.com", amount: 500000, amountFormatted: "Rp 500.000", method: "QRIS", program: "Teluk Bintuni", date: "24 Mei 2024, 14:32", status: "berhasil" as const },
      { transactionId: "TRX-20240524-002", donorName: "PT Hijau Lestari", amount: 25000000, amountFormatted: "Rp 25.000.000", method: "QRIS", program: "TN Sembilang", date: "24 Mei 2024, 11:15", status: "berhasil" as const },
      { transactionId: "TRX-20240523-003", donorName: "Dewi Lestari", donorEmail: "dewi@email.com", amount: 250000, amountFormatted: "Rp 250.000", method: "QRIS", program: "Desa Timbulsloko", date: "23 Mei 2024, 09:45", status: "berhasil" as const },
      { transactionId: "TRX-20240523-004", donorName: "Rudi Hermawan", donorEmail: "rudi@email.com", amount: 1000000, amountFormatted: "Rp 1.000.000", method: "QRIS", program: "Kwandang", date: "23 Mei 2024, 08:20", status: "pending" as const },
      { transactionId: "TRX-20240522-005", donorName: "Nina Safitri", donorEmail: "nina@email.com", amount: 150000, amountFormatted: "Rp 150.000", method: "QRIS", program: "Segara Anakan", date: "22 Mei 2024, 16:55", status: "berhasil" as const },
      { transactionId: "TRX-20240522-006", donorName: "CV Mangrove Sejati", amount: 15000000, amountFormatted: "Rp 15.000.000", method: "QRIS", program: "Teluk Balikpapan", date: "22 Mei 2024, 13:10", status: "berhasil" as const },
      { transactionId: "TRX-20240521-007", donorName: "Ahmad Fauzi", amount: 100000, amountFormatted: "Rp 100.000", method: "QRIS", program: "Desa Timbulsloko", date: "21 Mei 2024, 10:30", status: "gagal" as const },
    ];
    for (const t of txData) await ctx.db.insert("transactions", t);

    // Mangrove Species
    const speciesData = [
      { name: "Rhizophora mucronata", localName: "Bakau", count: "452.300", area: "890 Ha", survivalRate: 85, status: "Dominan" },
      { name: "Avicennia marina", localName: "Api-api", count: "328.100", area: "520 Ha", survivalRate: 78, status: "Stabil" },
      { name: "Sonneratia alba", localName: "Pedada", count: "215.400", area: "340 Ha", survivalRate: 72, status: "Berkembang" },
      { name: "Bruguiera gymnorrhiza", localName: "Lindur", count: "189.960", area: "280 Ha", survivalRate: 68, status: "Stabil" },
      { name: "Ceriops tagal", localName: "Tengar", count: "100.000", area: "130 Ha", survivalRate: 82, status: "Baru" },
    ];
    for (const s of speciesData) await ctx.db.insert("mangroveSpecies", s);

    // Growth Records
    const growthData = [
      { location: "Teluk Bintuni", species: "R. mucronata", height: "125 cm", diameter: "4,2 cm", age: "18 bulan", health: "Baik" },
      { location: "Desa Timbulsloko", species: "A. marina", height: "98 cm", diameter: "3,1 cm", age: "12 bulan", health: "Cukup" },
      { location: "TN Sembilang", species: "S. alba", height: "145 cm", diameter: "5,0 cm", age: "24 bulan", health: "Baik" },
      { location: "Kwandang", species: "B. gymnorrhiza", height: "82 cm", diameter: "2,8 cm", age: "10 bulan", health: "Baik" },
    ];
    for (const g of growthData) await ctx.db.insert("growthRecords", g);

    // Validations
    const valData = [
      { validationId: "VAL-001", project: "Desa Timbulsloko", type: "Penanaman", officer: "Bambang S.", submitted: "24 Mei 2024", photos: 8, gps: "-6.8975, 110.6383", survivalRate: "72%", status: "menunggu" as const },
      { validationId: "VAL-002", project: "Segara Anakan", type: "Monitoring", officer: "Sari W.", submitted: "22 Mei 2024", photos: 12, gps: "-7.6789, 108.8901", survivalRate: "58%", status: "menunggu" as const },
      { validationId: "VAL-003", project: "Teluk Bintuni", type: "Survival Rate", officer: "Dedi M.", submitted: "20 Mei 2024", photos: 6, gps: "-2.1234, 133.2345", survivalRate: "85%", status: "proses" as const },
      { validationId: "VAL-004", project: "Kwandang", type: "Penanaman", officer: "Rina A.", submitted: "18 Mei 2024", photos: 10, gps: "0.5678, 122.3456", survivalRate: "65%", status: "proses" as const },
      { validationId: "VAL-005", project: "TN Sembilang", type: "Monitoring", officer: "Ahmad F.", submitted: "16 Mei 2024", photos: 15, gps: "-2.3456, 104.5678", survivalRate: "88%", status: "selesai" as const },
    ];
    for (const val of valData) await ctx.db.insert("validations", val);

    // Monitoring Alerts
    const alertsData = [
      { project: "Desa Timbulsloko", alert: "Survival rate turun 8% dalam 2 minggu", severity: "high" as const, date: "24 Mei 2024" },
      { project: "Segara Anakan", alert: "Verifikasi lapangan tertunda 7 hari", severity: "high" as const, date: "23 Mei 2024" },
      { project: "Kwandang", alert: "Foto bukti belum lengkap (3/6)", severity: "medium" as const, date: "22 Mei 2024" },
      { project: "Teluk Balikpapan", alert: "Salinitas di atas ambang batas", severity: "medium" as const, date: "21 Mei 2024" },
    ];
    for (const a of alertsData) await ctx.db.insert("monitoringAlerts", a);

    // Field Data
    const fieldDataItems = [
      { fieldId: "FLD-001", location: "Desa Timbulsloko", date: "24 Mei 2024", species: "R. mucronata", bibit: 45200, height: "98 cm", survivalRate: "72%", salinity: "22 ppt", photos: 8, status: "terkirim" as const },
      { fieldId: "FLD-002", location: "Teluk Bintuni", date: "22 Mei 2024", species: "A. marina", bibit: 62300, height: "125 cm", survivalRate: "85%", salinity: "28 ppt", photos: 12, status: "terkirim" as const },
      { fieldId: "FLD-003", location: "TN Sembilang", date: "20 Mei 2024", species: "S. alba", bibit: 80500, height: "145 cm", survivalRate: "88%", salinity: "19 ppt", photos: 15, status: "draft" as const },
      { fieldId: "FLD-004", location: "Kwandang", date: "18 Mei 2024", species: "B. gymnorrhiza", bibit: 37500, height: "82 cm", survivalRate: "65%", salinity: "24 ppt", photos: 10, status: "terkirim" as const },
      { fieldId: "FLD-005", location: "Segara Anakan", date: "15 Mei 2024", species: "R. mucronata", bibit: 30000, height: "76 cm", survivalRate: "58%", salinity: "20 ppt", photos: 6, status: "revisi" as const },
    ];
    for (const f of fieldDataItems) await ctx.db.insert("fieldData", f);

    // Certificates
    const certData = [
      { certificateId: "CERT-001", recipient: "Andi Pratama", program: "Restorasi Teluk Bintuni", type: "Sertifikat Kontributor", bibit: 10, carbon: "5,2 ton", issued: "10 Mei 2024", status: "diterbitkan" as const },
      { certificateId: "CERT-002", recipient: "PT Hijau Lestari", program: "TN Sembilang", type: "Sertifikat CSR", bibit: 500, carbon: "260 ton", issued: "8 Mei 2024", status: "diterbitkan" as const },
      { certificateId: "CERT-003", recipient: "Rudi Hermawan", program: "Desa Timbulsloko", type: "Sertifikat Kontributor", bibit: 25, carbon: "13 ton", issued: "5 Mei 2024", status: "diterbitkan" as const },
      { certificateId: "CERT-004", recipient: "Komunitas Peduli Mangrove", program: "Kwandang", type: "Sertifikat Komunitas", bibit: 200, carbon: "104 ton", issued: "-", status: "draft" as const },
      { certificateId: "CERT-005", recipient: "Dewi Lestari", program: "Segara Anakan", type: "Sertifikat Kontributor", bibit: 7, carbon: "3,6 ton", issued: "-", status: "menunggu" as const },
      { certificateId: "CERT-006", recipient: "CV Mangrove Sejati", program: "Teluk Balikpapan", type: "Sertifikat CSR", bibit: 350, carbon: "182 ton", issued: "1 Mei 2024", status: "diterbitkan" as const },
    ];
    for (const c of certData) await ctx.db.insert("certificates", c);

    // Revenue Data
    const revData = [
      { month: "Jan", value: 12 }, { month: "Feb", value: 18 }, { month: "Mar", value: 15 },
      { month: "Apr", value: 22 }, { month: "Mei", value: 28 }, { month: "Jun", value: 35 },
      { month: "Jul", value: 32 }, { month: "Agu", value: 38 }, { month: "Sep", value: 42 },
      { month: "Okt", value: 48 }, { month: "Nov", value: 55 }, { month: "Des", value: 65 },
    ];
    for (const r of revData) await ctx.db.insert("revenueData", r);

    return "Database seeded successfully";
  },
});
