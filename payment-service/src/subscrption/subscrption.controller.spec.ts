import { Test, TestingModule } from '@nestjs/testing';
import { SubscrptionController } from './subscrption.controller';

describe('SubscrptionController', () => {
  let controller: SubscrptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscrptionController],
    }).compile();

    controller = module.get<SubscrptionController>(SubscrptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
