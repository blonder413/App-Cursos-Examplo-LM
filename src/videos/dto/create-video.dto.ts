import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsNotEmpty()
  @Length(1, 150)
  description: string;

  @IsUrl()
  src: string;
}
