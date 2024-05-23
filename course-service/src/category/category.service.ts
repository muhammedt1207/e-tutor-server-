// src/category/category.service.ts
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.model';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }


    async createCategory(createCategoryDto: any): Promise<Category> {
        const { categoryName } = createCategoryDto;
        console.log(categoryName);
        const regex = new RegExp(`^${categoryName}$`, 'i');
        const existingCategory = await this.categoryModel.findOne({ categoryName: { $regex: regex } }).exec();
        if (existingCategory) {
            throw new BadRequestException('Category with this name already exists');
        }
        const createdCategory = new this.categoryModel(createCategoryDto);
        console.log(this.createCategory, '###################');

        return createdCategory.save();
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    async updateCategory(id: string, updateCategoryDto: any): Promise<Category> {
        try {
          const existingCategory = await this.categoryModel.findById(id).exec();
          if (!existingCategory) {
            throw new NotFoundException('Category not found');
          }
          if (updateCategoryDto.categoryName) {
            const regex = new RegExp(`^${updateCategoryDto.categoryName}$`, 'i');
            const categoryWithSameName = await this.categoryModel.findOne({ categoryName: { $regex: regex } }).exec();
            if (categoryWithSameName && categoryWithSameName.id !== id) {
              throw new BadRequestException('Category with this name already exists');
            }
          }
          Object.assign(existingCategory, updateCategoryDto);
          return await existingCategory.save();
        } catch (error) {
          throw new InternalServerErrorException('Failed to update category');
        }
      }

    async deleteCategory(id: string): Promise<Category> {
        const category = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }
}
