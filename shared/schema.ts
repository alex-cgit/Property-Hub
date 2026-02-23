import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, date } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// --- Users ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("manager").notNull(), // manager, tenant, owner
  tenantId: integer("tenant_id"), // Link to tenant profile if role is tenant
  avatar: text("avatar"),
});

// --- Portfolios ---
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  status: text("status").default("Active").notNull(), // Active, Inactive
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Properties ---
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").references(() => portfolios.id),
  name: text("name").notNull(),
  address: text("address").notNull(),
  image: text("image"),
  type: text("type").notNull(), // Residential, Commercial, Mixed
  unitsCount: integer("units_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Units ---
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  unitNumber: text("unit_number").notNull(),
  status: text("status").default("Vacant").notNull(), // Occupied, Vacant, Maintenance
  bedrooms: integer("bedrooms").default(0),
  bathrooms: decimal("bathrooms").default("1.0"),
  rent: decimal("rent").notNull(),
  size: integer("size"), // sqft
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Tenants ---
export const tenants = pgTable("tenants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: text("status").default("Active").notNull(), // Active, Past, Lead
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Leases ---
export const leases = pgTable("leases", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").references(() => units.id).notNull(),
  tenantId: integer("tenant_id").references(() => tenants.id).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  rentAmount: decimal("rent_amount").notNull(),
  securityDeposit: decimal("security_deposit").default("0"),
  status: text("status").default("Active").notNull(), // Active, Expiring Soon, Expired
  documents: jsonb("documents").$type<string[]>(), // Array of URLs
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Maintenance Tickets ---
export const maintenanceTickets = pgTable("maintenance_tickets", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  unitId: integer("unit_id").references(() => units.id),
  taskType: text("task_type").notNull(), // Maintenance Request, etc.
  category: text("category"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").default("Medium").notNull(), // Low, Medium, High, Critical
  status: text("status").default("Open").notNull(), // Open, In Progress, Completed
  dateReported: date("date_reported").defaultNow().notNull(),
  assignedTo: text("assigned_to"), // Simple string for now, could be user_id later
  contactName: text("contact_name"),
  contactPhone: text("contact_phone"),
  // JSONB for nested complex data to keep schema simple for now
  comments: jsonb("comments").$type<{ id: string; text: string; author: string; date: string }[]>(),
  photos: jsonb("photos").$type<{ url: string; caption: string }[]>(),
  timeline: jsonb("timeline").$type<{ date: string; action: string; author: string; details?: string }[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Accounting: Chart of Accounts ---
export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // 1001, 5000 etc.
  name: text("name").notNull(),
  type: text("type").notNull(), // Asset, Liability, Equity, Revenue, Expense
  category: text("category"), // Cash, Receivables, etc.
  balance: decimal("balance").default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Accounting: Journal Entries ---
export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  reference: text("reference"), // External ID
  status: text("status").default("Draft").notNull(), // Draft, Posted
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Accounting: Journal Entry Lines ---
export const journalEntryLines = pgTable("journal_entry_lines", {
  id: serial("id").primaryKey(),
  journalEntryId: integer("journal_entry_id").references(() => journalEntries.id).notNull(),
  accountId: integer("account_id").references(() => accounts.id).notNull(),
  description: text("description"),
  debit: decimal("debit").default("0"),
  credit: decimal("credit").default("0"),
});

// --- Parties (Vendors, etc) ---
export const parties = pgTable("parties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // Vendor, Customer, Tenant, Employee, Other
  email: text("email"),
  phone: text("phone"),
  status: text("status").default("Active").notNull(),
  balance: decimal("balance").default("0"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Relations ---
export const portfolioRelations = relations(portfolios, ({ many }) => ({
  properties: many(properties),
}));

export const propertyRelations = relations(properties, ({ one, many }) => ({
  portfolio: one(portfolios, {
    fields: [properties.portfolioId],
    references: [portfolios.id],
  }),
  units: many(units),
  maintenanceTickets: many(maintenanceTickets),
}));

export const unitRelations = relations(units, ({ one, many }) => ({
  property: one(properties, {
    fields: [units.propertyId],
    references: [properties.id],
  }),
  leases: many(leases),
  maintenanceTickets: many(maintenanceTickets),
}));

export const tenantRelations = relations(tenants, ({ many }) => ({
  leases: many(leases),
}));

export const leaseRelations = relations(leases, ({ one }) => ({
  unit: one(units, {
    fields: [leases.unitId],
    references: [units.id],
  }),
  tenant: one(tenants, {
    fields: [leases.tenantId],
    references: [tenants.id],
  }),
}));

export const journalEntryRelations = relations(journalEntries, ({ many }) => ({
  lines: many(journalEntryLines),
}));

export const journalEntryLineRelations = relations(journalEntryLines, ({ one }) => ({
  journalEntry: one(journalEntries, {
    fields: [journalEntryLines.journalEntryId],
    references: [journalEntries.id],
  }),
  account: one(accounts, {
    fields: [journalEntryLines.accountId],
    references: [accounts.id],
  }),
}));

// --- Zod Schemas ---
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertPortfolioSchema = createInsertSchema(portfolios);
export const selectPortfolioSchema = createSelectSchema(portfolios);

export const insertPropertySchema = createInsertSchema(properties);
export const selectPropertySchema = createSelectSchema(properties);

export const insertUnitSchema = createInsertSchema(units);
export const selectUnitSchema = createSelectSchema(units);

export const insertTenantSchema = createInsertSchema(tenants);
export const selectTenantSchema = createSelectSchema(tenants);

export const insertLeaseSchema = createInsertSchema(leases);
export const selectLeaseSchema = createSelectSchema(leases);

export const insertMaintenanceTicketSchema = createInsertSchema(maintenanceTickets);
export const selectMaintenanceTicketSchema = createSelectSchema(maintenanceTickets);

export const insertAccountSchema = createInsertSchema(accounts);
export const selectAccountSchema = createSelectSchema(accounts);

export const insertJournalEntrySchema = createInsertSchema(journalEntries);
export const selectJournalEntrySchema = createSelectSchema(journalEntries);

export const insertJournalEntryLineSchema = createInsertSchema(journalEntryLines);
export const selectJournalEntryLineSchema = createSelectSchema(journalEntryLines);

export const insertPartySchema = createInsertSchema(parties);
export const selectPartySchema = createSelectSchema(parties);
