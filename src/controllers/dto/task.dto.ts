import { IsString, IsEmail, IsNumber } from "class-validator";

export class TaskDto {
  @IsString()
  name: string;

  @IsNumber()
  user_id: string;
}
