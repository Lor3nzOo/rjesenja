import {IsNotEmpty, Max, Min} from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @Min(4)
    @Max(8)
    korisnickoIme: string;

    @IsNotEmpty()
    @Min(8)
    lozinka: string;
}