import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, IsOptional, Matches } from 'class-validator';

export class CreateShortURLDto {
  @ApiProperty({
    description: 'Original URL',
    example: 'https://www.cursor.com/',
  })
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;

  @ApiPropertyOptional({
    description: 'Desired Code',
    example: 'a4fgpl',
  })
  @IsOptional()
  @Matches(/^[a-zA-Z0-9_-]{6,10}$/, {
    message: 'Короткий код должен содержать от 6 до 10 букв, цифр, "_" или "-"',
  })
  desiredCode?: string;
}
