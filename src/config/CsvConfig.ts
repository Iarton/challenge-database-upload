import csvParse from 'csv-parse';
import fs from 'fs';
// import path from 'path';

class CsvConfig {
  public async loadCSV(filePath: string): Promise<[]> {
    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: any = [];

    parseCSV.on('data', line => {
      lines.push(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return lines;
  }
}

export default CsvConfig;

// const csvFilePath = path.resolve(__dirname, 'import_template.csv');
