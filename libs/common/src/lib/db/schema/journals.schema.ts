import { pgTable, serial, text, integer, date } from 'drizzle-orm/pg-core';
import { users } from './auth.schema';
import { relations } from 'drizzle-orm';

export const journals = pgTable('journals', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(
      () => {
        return users.id;
      },
      { onDelete: 'cascade' }
    ),
  description: text('description'),
  account: text('account').notNull(),
  date: date('date').notNull().defaultNow(),
  debit: integer('debit').notNull(),
  credit: integer('credit').notNull(),
});

export const journalRelations = relations(journals, ({ one }) => ({
  users: one(users, {
    fields: [journals.userId],
    references: [users.id],
  }),
}));
