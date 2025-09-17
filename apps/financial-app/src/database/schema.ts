import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  hash: text('hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// export const bookmarks = pgTable('bookmarks', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull().unique(),
//   description: text('description').notNull(),
//   link: text('link').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// export const userRelations = relations(users, ({ many }) => ({
//   bookmark: many(bookmarks),
// }));

// export const bookmarkRelations = relations(bookmarks, ({ one }) => ({
//   user: one(users, {
//     fields: [bookmarks.userId],
//     references: [users.id],
//   }),
// }));
