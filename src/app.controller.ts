import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 主要教學:
 *   https://newideas.coderbridge.io/2020/12/02/nest-js-api-controller/
 *
 * Interface usage:
 *   1) https://medium.com/enjoy-life-enjoy-coding/typescript-%E5%BE%9E-ts-%E9%96%8B%E5%A7%8B%E5%AD%B8%E7%BF%92%E7%89%A9%E4%BB%B6%E5%B0%8E%E5%90%91-interface-%E7%94%A8%E6%B3%95-77fd0959769f
 *   2) https://pjchender.dev/typescript/ts-interface/
 *
 */
interface EmployeeData {
  name: string,
  email: string,
  number: string,
  age: number,
  [key: string]: any,
  actAs(): void;
}

/**
 * refer to pagy:
 *   https://ddnexus.github.io/pagy/how-to#gsc.tab=0
 */
interface PagyData {
  page: number,
  size: number,
}

interface QueryData {
  type: 'comic' | null | 'novel';
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 回傳的值為 string 的意思
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * http://localhost:3000/test
   * http://localhost:3000/test?page=1
   */
  @Get('test')
  getTest(
    @Query() query: PagyData
  ): string {
    return `test index page, params: page is ${query.page ?? 'nil'} and size is ${query.size ?? 'nil'}`;
  }

  /**
   * tutorial:
   *   https://newideas.coderbridge.io/2020/12/02/nest-js-api-controller/
   */
  @Get('test/:testId')
  getTestId(@Param('testId') id: number): number {
    return id;
  }

  // post request
  @Post('employee')
  testEmployee(
    @Body() employeeData: EmployeeData,
    @Query() query: QueryData
  ): Object {
    return {
      name: employeeData.name,
      email: employeeData.email,
      type: query.type
    };
  }
}
