import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalDTO, updateJournalDTO } from '@my-workspace/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserPayload } from '@my-workspace/common';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('allMyJournals')
  getAllJournalByUserId(@Req() req: Request) {
    return this.journalsService.getAllJournalByUserId(req.user as UserPayload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getJournalById(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.journalsService.getJournalById(id, req.user as UserPayload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createJournal(@Body() dto: JournalDTO, @Req() req: Request) {
    return this.journalsService.createJournal(dto, req.user as UserPayload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateJournalById(
    @Body() dto: updateJournalDTO,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.journalsService.updateJournal(id, dto, req.user as UserPayload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteJournalById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    await this.journalsService.getJournalById(id, req.user as UserPayload);
  }
}
