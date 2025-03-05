import { IsNotEmpty, IsString } from "class-validator";

export class EditProfileDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}