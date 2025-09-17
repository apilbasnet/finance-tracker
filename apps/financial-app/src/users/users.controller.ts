import { Controller, Get, Inject, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { UsersService } from './users.service';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@my-workspace/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    // private usersService: UsersService,
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllUsers() {
    const users = this.db.select().from(schema.users);
    return users;
  }
}
