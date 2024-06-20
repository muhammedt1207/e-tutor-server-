import { Test, TestingModule } from '@nestjs/testing';
import { SubscrptionService } from './subscrption.service';

describe('SubscrptionService', () => {
  let service: SubscrptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscrptionService],
    }).compile();

    service = module.get<SubscrptionService>(SubscrptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
