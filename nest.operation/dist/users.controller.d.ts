import { Request, Response } from 'express';
interface VideoParam {
    id: number;
    name: string;
}
export declare class UserController {
    getProfile(req: Request, res: Response): Promise<any>;
    getVideos(res: Response, params: VideoParam, query: VideoParam, headers: string): Promise<Response<any, Record<string, any>>>;
    addVideo(reqData: VideoParam, req: Request, res: Response): Promise<any>;
}
export {};
