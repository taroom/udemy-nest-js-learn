import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'minimal tiga karakter untuk username' })
  @MaxLength(20, { message: 'maksimal 20 karakter untuk username' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'minimal tiga karakter' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password harus ada karakter besar, karakter huruf kecil, karakter angka dan karakter spesial',
  })
  password: string;
}
