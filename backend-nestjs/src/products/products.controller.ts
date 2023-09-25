import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from './dtos/create-product.dto';
import { SearchProductDto } from './dtos/filter-product.dto';
import { Pagination } from './dtos/pagination.dto';
import { ProductsService } from './products.service';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Product } from './schemas';
import { UpdateProductDto } from './dtos/update-product.dto';
//Validation upload file
const maxSize = 100000000;
const validateFile = {
  limits: { fileSize: maxSize },
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const fileName = `${file.originalname}-${uniqueSuffix}${ext}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      const errorMessage = (req.fileValidationError =
        'Chỉ cho phép tệp hình ảnh');
      return callback(errorMessage, false);
    }
    callback(null, true);
  },
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post('/all')
  async createAll(@Body() createAll: CreateProductDto) {
    const createAllPro = await this.productsService.createAll(createAll);
    return createAllPro;
  }
  // Thêm sản phẩm
  @Post()
  @UseInterceptors(FileInterceptor('avatar', validateFile))
  async createProduct(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Res() response,
  ): Promise<Product> {
    const testAddProduct = await this.productsService.createProduct(
      avatar,
      createProductDto,
      response,
    );
    console.log(testAddProduct);
    return testAddProduct;
  }
  //Thêm 1 ảnh avatar default
  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar', validateFile))
  uploadFile(@UploadedFile() avatar: Express.Multer.File) {
    console.log(avatar);
  }
  // Lấy ra các sản phẩm có cùng cate, pro, page
  @Get()
  async searchProducts(
    @Query() searchProductDto: SearchProductDto,
  ): Promise<Pagination> {
    return this.productsService.searchProducts(searchProductDto);
  }
  //Lấy ra chi tiết sản phẩm theo ID
  @Get(':id')
  async find(@Param('id') id: string) {
    const tesstProID = await this.productsService.findOne(id);
    return tesstProID;
  }
  //Lấy sản phẩm đề xuất
  @Get('/suggest/:id')
  async getRecommendProducts(@Param('id') id: string) {
    return this.productsService.getSuggetionProduct(id);
  }
  //Cập nhật sản phẩm
  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor(validateFile))
  async updateproduct(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updateProDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, files, updateProDto);
  }
  //Xóa sản phẩm
  @Delete(':id')
  async deletedProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
