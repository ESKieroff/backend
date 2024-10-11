import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create.stock.dto';
import { UpdateStockItemsDto } from './dto/update.stock.dto';
import { StockRepository } from './stock.repository';
import { Settings } from 'src/config/settings';
//simport { stock_items } from '@prisma/client';
// import { stock_items } from '@prisma/client';
//import {Settings} from '../../config/settings';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async create(createStockDto: CreateStockDto) {
    // se movimento for output, verifica o parametro em Settings.enableNegativeStock
    // se for false, chama função consulta estoque pra ver se é negativo
    // se for negativo, exibe mensagem informativa
    // const contador da sequencia
    // cria docto em stock e recupera dados pra inserir no item
    // verifica se já tem intens incluídos e última sequencia
    // insere dados do item, itera sequencia
    // se não tem mais itens termina e exibe ResponseStockDTo

    // Passo 1: Verifica se é operação de saída e o parametro do settings para validar saldo, se for o caso
    if (
      createStockDto.stock_moviment === 'OUTPUT' &&
      !Settings.enableNegativeStock
    ) {
      for (const item of createStockDto.items) {
        const saldoAtual = await this.checkStock(item.product_id, item.lote);
        if (item.quantity > saldoAtual) {
          throw new Error(
            `Saldo insuficiente para o produto ${item.product_id} no lote ${item.lote}.`
          );
        }
      }
    }

    // Passo 2: Cria o documento `Stock` e obtém seu ID
    const stockDocument = await this.stockRepository.createStock({
      document_date: createStockDto.document_date,
      document_number: createStockDto.document_number,
      stock_moviment: createStockDto.stock_moviment
    });

    // Passo 3: Insere cada item associado ao documento `Stock` criado
    // let sequencia = 1;
    // for (const item of createStockDto.items) {
    //   await this.stockRepository.createStockItems({
    //     stock: { connect: { id: stockDocument.id } },
    //     //product_id: item.product_id,
    //     quantity: item.quantity,
    //     unit_price: item.unit_price,
    //     total_price: item.unit_price * item.quantity,
    //     lote: item.lote,
    //     expiration: item.expiration,
    //     sequence: sequencia,
    //     //supplier: item.supplier,
    //     //costumer: item.costumer,
    //     //stock_location_id: item.stock_location_id,
    //     observation: item.observation
    //   });
    //   sequencia++;
    // }

    // Retorna o documento de estoque e os itens adicionados
    return {
      ...stockDocument,
      items: createStockDto.items
    };
  }

  async checkStock(product_id: number, lote: string): Promise<number> {
    const estoque = await this.stockRepository.checkStock(product_id, lote);

    return estoque || 0;
  }

  findAll(orderBy: string) {
    return this.stockRepository.findAll(orderBy);
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, _updateStockDto: UpdateStockItemsDto) {
    return `This action updates a #${id} stock`;
  }

  // organizeResponseByProduct(stockItems: any[]): stock_items[] {
  //   const produtosMap = new Map<number, stock_items>();

  //   stockItems.forEach(item => {
  //     const { product_id, lote, quantity, unit_price } = item;
  //     let total_price = quantity * unit_price;
  //     let total_quantity = quantity;

  //     if (!produtosMap.has(product_id)) {
  //       produtosMap.set(product_id, {
  //         product_id,
  //         total_quantity: 0,
  //         total_price: 0,
  //         lotes: []
  //       });
  //     }

  //     const produto = produtosMap.get(product_id)!;
  //     produto.total_quantity += quantity;
  //     produto.total_price += total_price;

  //     const loteExistente = produto.lotes.find(l => l.lote === lote);
  //     if (loteExistente) {
  //       loteExistente.quantity += quantity;
  //       loteExistente.total_price += total_price;
  //     } else {
  //       produto.lotes.push({ lote, quantity, total_price });
  //     }
  //   });

  // return Array.from(produtosMap.values());
  //}
}
