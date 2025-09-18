import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JournalDTO } from '@my-workspace/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@my-workspace/common';
import { UserPayload, updateJournalDTO } from '@my-workspace/common';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class JournalsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async getJournalById(id: number, user: UserPayload) {
    const journals = await this.db
      .select()
      .from(schema.journals)
      .where(
        and(eq(schema.journals.id, id), eq(schema.journals.userId, user.userId))
      );

    return {
      journals,
    };
  }

  async getAllJournalByUserId(user: UserPayload) {
    const journals = await this.db
      .select()
      .from(schema.journals)
      .where(eq(schema.journals.userId, user.userId));

    return {
      journals,
    };
  }

  async createJournal(dto: JournalDTO, user: UserPayload) {
    if (!user || !user.userId) {
      throw new HttpException(
        'User not authenticated or invalid user data',
        HttpStatus.UNAUTHORIZED
      );
    }

    const [journal] = await this.db
      .insert(schema.journals)
      .values({
        userId: user.userId,
        description: dto.description,
        account: dto.account,
        debit: dto.debit,
        credit: dto.credit,
      })
      .returning();

    return journal;
  }

  async updateJournal(id: number, dto: updateJournalDTO, user: UserPayload) {
    const updateData = { ...dto, updatedAt: new Date() };

    const [updated] = await this.db
      .update(schema.journals)
      .set(updateData)
      .where(
        and(eq(schema.journals.id, id), eq(schema.journals.userId, user.userId))
      )
      .returning();

    if (!updated) {
      throw new NotFoundException('Journal entry not found');
    }

    return updated;
  }

  async deleteJournal(id: number, user: UserPayload) {
    return this.db
      .delete(schema.journals)
      .where(
        and(eq(schema.journals.id, id), eq(schema.journals.userId, user.userId))
      );
  }
}
