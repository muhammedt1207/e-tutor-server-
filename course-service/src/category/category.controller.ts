import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, NotFoundException, InternalServerErrorException, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async create(@Body() createCategoryDto: any, @Res() res: Response): Promise<Response> {
        try {
            console.log(createCategoryDto);

            const category = await this.categoryService.createCategory(createCategoryDto);
            console.log(category,'-------');
            
            return res.status(200).json(
                {
                    success: true,
                    data: category,
                    message: 'categories'
                });
        } catch (error) {
            if (error instanceof BadRequestException) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to create category' });
        }
    }

    @Get()
    async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try {
            const categories = await this.categoryService.findAll();
            console.log(categories);

            return res.status(200).json(
                {
                    success: true,
                    data: categories,
                    message: 'categories'
                });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to retrieve categories' });
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const category = await this.categoryService.findOne(id);
            return res.status(200).json(
                {
                    success: true,
                    data: category,
                    message: 'categories'
                });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to retrieve category' });
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCategoryDto: any, @Res() res: Response): Promise<Response> {
        try {
            const category = await this.categoryService.updateCategory(id, updateCategoryDto);
            return res.status(200).json(
                {
                    success: true,
                    data: category,
                    message: 'categories updated'
                });
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to update category' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const category = await this.categoryService.deleteCategory(id);
            return res.status(200).json(
                {
                    success: true,
                    data: category,
                    message: 'categories deleted'
                });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to delete category' });
        }
    }
}
