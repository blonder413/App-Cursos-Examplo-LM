import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: 'título del curso', default: '' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Valor del curso', default: 0, minimum: 0 })
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  cover: string;
}
