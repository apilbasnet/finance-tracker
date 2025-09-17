import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@my-workspace/common';
import * as argon from 'argon2';
import { eq } from 'drizzle-orm';
import { SignInDto, SignUpDto } from '@my-workspace/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  private async findUserByEmail(email: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    return user;
  }

  async signup(dto: SignUpDto) {
    const userEmail = await this.findUserByEmail(dto.email);

    if (userEmail) {
      throw new ConflictException('Email already exists');
    }

    const hash = await argon.hash(dto.password);

    const [user] = await this.db
      .insert(schema.users)
      .values({
        username: dto.username,
        email: dto.email,
        hash: hash,
      })
      .returning({
        id: schema.users.id,
        username: schema.users.username,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
      });

    return this.signToken(user.id, user.email);
  }

  async signin(dto: SignInDto) {
    const user = await this.findUserByEmail(dto.email);

    if (!user) {
      throw new ConflictException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ConflictException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '55m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
