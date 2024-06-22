import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import axios from 'axios';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {

    /**
     * Fetch list of dog breeds
     */
    @ApiOperation({ summary: 'Get list of dog breeds' })
    @Get('breeds')
    async getBreeds() {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/list/all');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch dog breeds');
        }
    }

    /**
     * Fetch images of a specific dog breed
     * @param breed Name of the dog breed
     */
    @ApiOperation({ summary: 'Get images of a specific dog breed' })
    @Get('breeds/:breed/images')
    async getBreedImages(@Param('breed') breed: string) {
        try {
            const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch images of breed ${breed}`);
        }
    }

    /**
     * Fetch liked images of dog breeds
     * @param breed Optional filter by breed name
     */
    @ApiOperation({ summary: 'Get liked images of dog breeds' })
    @Get('liked-images')
    async getLikedImages(@Query('breed') breed?: string) {
        try {
            
            const likedImages = []; 
            return likedImages;
        } catch (error) {
            throw new Error('Failed to fetch liked images');
        }
    }
}
