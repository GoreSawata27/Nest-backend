import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { AppService } from 'src/app.service';

@Controller('/users')
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // params
  @Get(':id')
  getParam(@Param() param: { id: string }) {
    console.log(param.id, 'Param ID');
    return 'Success';
  }

  // query
  @Get('/')
  getQuery(@Query() query: any) {
    console.log(query, 'Query');
    return 'Success';
  }

  // parsing body
  @Post('/')
  creteUser(@Body() { id, name }: { id: number; name: string }) {
    console.log(id, 'id');
    console.log(name, 'name');
    return {
      id,
      name,
    };
  }
}
