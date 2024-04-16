import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mapeamento')
  async mapeamento() {
    return await this.appService.mapeamento();
  }
}
