import { Controller, Get, Render, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller({ path: 'docs/:version', version: VERSION_NEUTRAL })
@ApiExcludeController()
export class DocsController {
  constructor() {}

  @Get()
  @Render('index')
  root() {
    return { specUrl: `${process.env.OPEN_API_DOMAIN}/api-json/` };
  }
}
