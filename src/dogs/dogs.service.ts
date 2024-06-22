import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utils } from 'src/utils';

@Injectable()
export class DogsService {
    private ErrorMessages: any;
    constructor(private configService: ConfigService) { }


}
