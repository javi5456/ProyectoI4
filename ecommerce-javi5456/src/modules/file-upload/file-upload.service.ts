import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/Product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(`Product ${productId} does not exist`);

    const uploadImage = await this.fileUploadRepository.uploadImage(file);
    await this.productRepository.update(productId, {
      imgUrl: uploadImage.secure_url,
    });
    return 'update Product';
  }
}
