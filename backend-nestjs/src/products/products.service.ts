import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { SearchProductDto } from './dtos/filter-product.dto';
import { Pagination } from './dtos/pagination.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './schemas';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  //Lấy tất cả sản phẩm theo ID
  async getAll(query): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate('category')
      .populate('manufacturer')
      .limit(6)
      .skip(6 * Number(query.page))
      .exec();
  }
  // Thêm sản phẩm có định dạng upload file
  async createProduct(
    avatar: Express.Multer.File,
    createProductDto: CreateProductDto,
    @Res() response,
  ): Promise<Product> {
    console.log(avatar);
    const urlAvatar = `${process.env.URL_PICTURE}/${avatar.filename}`;
    const newProduct = new this.productModel(createProductDto);
    newProduct.avatar = urlAvatar;
    const createProduct = await newProduct.save();
    if (!createProduct) {
      throw new BadRequestException(`Request Failed`);
    }
    return response.status(HttpStatus.OK).send(createProduct);
  }

  async createAll(createAll: CreateProductDto) {
    const createAllPro = await this.productModel.create(createAll);
    return createAllPro;
  }
  // Lấy chi tiết sản phẩm theo ID
  async findOne(id: string): Promise<Product> {
    return await this.productModel
      .findById(id)
      .populate('manufacturer')
      .populate('category')
      .exec();
  }
  //Tìm kiếm sản phẩm theo category, manu, page name
  async searchProducts(
    searchProductDto: SearchProductDto,
  ): Promise<Pagination> {
    let page = searchProductDto.page || 1;
    const limit = searchProductDto.limit || 6;
    const { category, manufacturer, name } = searchProductDto;
    const filter = {
      $and: [
        name ? { name: { $regex: name, $options: '$i' } } : {},
        manufacturer && manufacturer != '62eeaca942e43cb008e8b926'
          ? { manufacturer: manufacturer }
          : {},
        category && category != '62fdac9e0067c1218e42f032'
          ? { category: category }
          : {},
      ],
    };
    const productsCount = await this.productModel
      .find(filter)
      .populate('category')
      .populate('manufacturer')
      .count()
      .exec();

    if (productsCount == 0) return new Pagination([], limit, 1, 1);
    const totalPage = Math.ceil(productsCount / limit);

    if (totalPage < page) page = totalPage;

    // pagination
    const products = await this.productModel
      .find(filter)
      .skip(limit * page - limit)
      .limit(limit)
      .exec();
    return new Pagination(products, limit, page, totalPage);
  }
  //Lấy sản phẩm ra theo đề xuất
  async getSuggetionProduct(id: string): Promise<Product[]> {
    const products = this.findOne(id);
    return await this.productModel
      .find({ price: { $lte: (await products).price } })
      .sort({ price: -1 })
      .limit(3);
  }
  //Cập nhật sản phẩm
  async updateProduct(
    id: string,
    file: Array<Express.Multer.File>,
    updateProDto: UpdateProductDto,
  ): Promise<Product> {
    const newProduct = new this.productModel(updateProDto);
    const potision = JSON.parse(updateProDto.potision);
    file.forEach(function (pictures, index) {
      console.log(index);
      if (index === 0) {
        const picturePath = `${process.env.URL_PICTURE}/${pictures.filename}`;
        newProduct.avatar = picturePath;
      } else {
        const picturePath = `${process.env.URL_PICTURE}/${pictures.filename}`;
        console.log(potision);
        newProduct.pictures[index - 1] = {
          potision: potision[index - 1],
          url: picturePath,
        };
      }
    });
    const update = {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      avatar: newProduct.avatar,
      category: newProduct.category,
      manufacturer: newProduct.manufacturer,
      pictures: newProduct.pictures,
    };
    return await this.productModel.findByIdAndUpdate(id, update).exec();
  }
  async deleteImage(id: string) {
    const products = await this.findOne(id);
    fs.unlinkSync(`uploads/${products.avatar}`);
    for (const val of products.pictures) {
      fs.unlinkSync(`uploads/${val.url}`);
    }
  }
  //Xóa sản phẩm
  async delete(id: string) {
    const deletedProduct = this.productModel.findByIdAndDelete(id).exec();
    return deletedProduct;
  }
}
