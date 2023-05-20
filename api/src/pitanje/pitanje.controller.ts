import {Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { PitanjeService } from './pitanje.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "./editFileName";

@Controller('pitanje')
export class PitanjeController {
  constructor(private readonly pitanjeService: PitanjeService) {}

  @Post('new')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName
    })
  }))
  async newPitanje(@Req() req, @Body() dto, @UploadedFile() file) {
    return this.pitanjeService.newPitanje(req, dto, file)
  }

  @Get()
  async all() {
    return this.pitanjeService.all()
  }

  @Post('comment')
  async Comment(@Req() req, @Body() dto) {
    return this.pitanjeService.Comment(req, dto)
  }

  @Get('me')
  async Me(@Req() req) {
    return this.pitanjeService.Me(req)
  }

  @Post('del')
  async Del(@Req() req, @Body() dto) {
    return this.pitanjeService.Del(req, dto)
  }

  @Post('delComm')
  async DelComm(@Req() req, @Body() dto) {
    return this.pitanjeService.delComment(req, dto)
  }
}
