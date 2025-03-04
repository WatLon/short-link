import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { RedirectToOriginalURLUseCase } from '../../application/use-cases/redirect-to-original-url.usecase';
import { CreateShortURLDto } from '../dto/create-short-url.dto';
import { Response, Request } from 'express';
import { CreateShortURLUseCase } from 'src/application/use-cases/create-short-url.use-case';

@Controller()
export class ShortURLController {
  constructor(
    private readonly createShortURLUseCase: CreateShortURLUseCase,
    private readonly redirectToOriginalURLUseCase: RedirectToOriginalURLUseCase,
  ) {}

  @Post('shorten')
  async createShortURL(
    @Body() createShortUrlDto: CreateShortURLDto,
    @Req() req,
  ) {
    const ownerId = req.user?.id;
    const shortCode = await this.createShortURLUseCase.execute(
      createShortUrlDto.originalUrl,
      createShortUrlDto.desiredCode ?? null,
      ownerId,
    );
    return { shortCode };
  }

  @Get(':shortCode')
  async redirectToOriginal(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const originalUrl = await this.redirectToOriginalURLUseCase.execute(
        shortCode,
        req.ip ?? null,
        req.headers['user-agent'] ?? null,
      );
      res.redirect(originalUrl);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }
}
