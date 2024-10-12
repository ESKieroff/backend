import { Injectable } from '@nestjs/common';
import { CreateStockDto, CreateStockItemsDto } from './dto/create.stock.dto';
import { UpdateStockItemsDto } from './dto/update.stock.dto';
import { StockRepository } from './stock.repository';
import { Settings } from '../../config/settings';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}
  // ATENÇÃO: NÃO REMOVER COMENTÁRIOS - SERVEM PRA EU ME LOCALIZAR NO CÓDIGO E O QUE TEM PRA FAZER
  // criar estoque
  // se movimento for output, verifica o parametro em Settings.enableNegativeStock
  // se for false, chama função consulta estoque pra ver se é negativo
  // se for negativo, exibe mensagem informativa
  // const contador da sequencia
  // cria docto em stock e recupera dados pra inserir no item
  // verifica se já tem intens incluídos e última sequencia
  // insere dados do item, itera sequencia
  // se não tem mais itens termina e exibe ResponseStockDTo

  async create(createStockDto: CreateStockDto) {
    // Passo 1: Verifica se é operação de saída e o parametro do settings para validar saldo, se for o caso

    const errorMessages = [];

    // verifica se stock_moviment é output
    if (createStockDto.stock_moviment === 'OUTPUT') {
      // se sim verifica se enableNegativeStock é false
      if (!Settings.enableNegativeStock) {
        // se for chama função checkStock para verificar estoque disponível
        await this.validateStock(createStockDto.items, errorMessages);
      }
    }

    if (errorMessages.length > 0) {
      return {
        success: false,
        errors: errorMessages,
        message:
          'Não foi possível processar todos os itens devido a saldos insuficientes.'
      };
    }
    // Passo 2: Cria o documento `Stock` e obtém seu ID
    // precisa converter a data que recebe no DTO para o formato Date
    const stockDocument = await this.stockRepository.createStock({
      document_number: createStockDto.document_number,
      document_date: new Date(),
      stock_moviment: createStockDto.stock_moviment,
      created_at: new Date(),
      updated_at: new Date()
    });

    console.log('Stock document created:', stockDocument);

    // Passo 3: Insere cada item associado ao documento `Stock` criado
    // pensa num bagulho chato de fazer
    let sequencia = 1;
    for (const item of createStockDto.items) {
      await this.stockRepository.createStockItems({
        stock_id: stockDocument.id,
        product_id: item.product_id,
        stock_location_id: item.stock_location_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
        lote: item.lote,
        expiration: item.expiration,
        sequence: sequencia,
        supplier: item.supplier,
        costumer: item.costumer,
        observation: item.observation,
        image_link: item.image_link,
        created_at: new Date(),
        updated_at: new Date()
      });
      sequencia++;
    }

    //Retorna o documento de estoque e os itens adicionados
    return {
      ...stockDocument,
      items: createStockDto.items
    };
  }

  private async validateStock(
    items: CreateStockItemsDto[],
    errorMessages: string[]
  ) {
    for (const item of items) {
      const saldoAtual = await this.checkStock(item.product_id, item.lote);
      if (item.quantity > saldoAtual) {
        errorMessages.push(
          `Saldo insuficiente para o produto ${item.product_id} no lote ${item.lote}. \nQuantidade atual: ${saldoAtual}.`
        );
      }
    }
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
