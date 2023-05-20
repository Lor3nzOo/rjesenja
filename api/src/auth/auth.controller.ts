import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registracija')
  async Registracija(@Body() dto) {
    return this.authService.Registracija(dto)
  }

  @Post('prijava')
  async Prijava(@Body() dto, @Res() res) {
    return this.authService.Prijava(dto, res)
  }

  @Get('session')
  async Session(@Req() req) {
    return this.authService.Session(req)
  }

  @Post('username')
  async Username(@Req() req, @Body() dto) {
    return this.authService.Username(dto, req)
  }
}
