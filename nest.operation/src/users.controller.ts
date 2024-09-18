import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Param,
  Query,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
interface VideoParam {
  id: number;
  name: string;
}
@Controller('/users')
export class UserController {
  @Get('/profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('hello ');
      return res.json({
        status: HttpStatus.OK,
        data: {
          name: 'Aryan Rana',
          age: 21,
        },
        message: 'Got profile.',
      });
    } catch (error) {
      return error.message;
    }
  }

  @Get('/video/:id')
  async getVideos(
    // @Req() req: Request,
    @Res() res: Response,
    @Param() params: VideoParam,
    @Query() query: VideoParam,
    @Headers() headers: string,
  ) {
    try {
      console.log('Id got', params.id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          videoId: params.id,
          videoName: query.name,
          headers: headers,
        },
        message: `I got video id is ${params.id}`,
      });
    } catch (error) {
      return res.json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  @Post('/addvideo')
  async addVideo(
    @Body() reqData: VideoParam,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      console.log('body data', reqData);
      return res.json({
        status: HttpStatus.OK,
        data: {
          videoId: reqData.id,
          videoName: reqData.name,
        },
        message: 'Video added successfully.',
      });
    } catch (error) {
      return error.message;
    }
  }
}
