import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/status')
  getAppStatus(@Req() req: Request): string {
    console.log('req', req);
    return 'app_status';
  }

  @Get('/version/:id/')
  getVersion(@Param('id') id: string): string {
    console.log('id', id);
    return id;
  }

  @Get('/version/:ver1/:ver2')
  getAppVersion(@Param() param: any): string {
    console.log('param', param);
    return param; // param { ver1: '2', ver2: '3' }
  }

  @Get('paths') // localhost:3000/paths?abc=1&apiKey=123123dsxc
  getAppPaths(@Query() query: any): string {
    console.log('query', query?.apiKey);
    return 'path';
  }

  @Get('path')
  getPaths(@Query('key') key: string): string {
    console.log('key', key);
    return key ?? 'nothing';
  }
}
