import path from 'path';
import Transaction from '../models/Transaction';
import CsvConfig from '../config/CsvConfig';
import uploadConfig from '../config/upload';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  csvFilename: string;
}

interface TransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute({ csvFilename }: Request): Promise<Transaction[]> {
    const csvConfig = new CsvConfig();
    const createTransactionService = new CreateTransactionService();

    const csvFilePath = path.join(uploadConfig.directory, csvFilename);

    const transactions = await csvConfig.loadCSV(csvFilePath);

    const transactionsArray: Transaction[] = [];

    for (const element of transactions) {
      const transaction = await createTransactionService.execute({
        title: element[0],
        type: element[1],
        value: element[2],
        category: element[3],
      });
      transactionsArray.push(transaction);
    }

    return transactionsArray;
  }
}

export default ImportTransactionsService;
