import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserDto {
  @ApiProperty({ type: String })
  access_token: string;
}
