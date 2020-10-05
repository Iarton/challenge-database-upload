import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transfer = await transactionRepository.findOne({ where: { id } });

    if (!transfer) {
      throw new AppError('Transfer not found', 404);
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
