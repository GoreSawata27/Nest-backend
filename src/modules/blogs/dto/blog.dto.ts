import { IsNumber, IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  email: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  authorId: number;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
