import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Endereco } from './interfaces/endereco';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class AppService {

  async mapeamento() {
    const json: any[] = await this.readJsonFile();
    const endereçosSorteados = this.getRandomUniqueElements(json, 1000);
    await this.criarEndereços(endereçosSorteados);

    return
  }

  private readJsonFile(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readFile("./joinville.json" , "utf8", function(err, data){
        if(err){
          console.error("Erro ao ler arquivo", err);
          reject(err);
        } else {
          resolve(JSON.parse(data))
        }
      });
    }) 
  }

  private criarEndereços(data: any) {
    let enderecos: Endereco[] = []
    for (let item of data) {
      enderecos.push({
        latitude: item.LAT,
        longitude: item.LON,
        numero: item.NUMBER || 0,
        rua: item.STREET || ''
      })
    }

    try {
      return prisma.endereco.createMany({ data: enderecos });
    } catch (err) {
      console.error('Erro ao criar endereços:', err)
      throw err;
    }
  }

  private shuffle(array: any[]) {
    let index: number = array.length
    let tempValue: any
    let randomIndex: number;
  
    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;
      tempValue = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
  
    return array;
  }

  private getRandomUniqueElements(array: any[], count: number) {
    const shuffled = this.shuffle(array);
    const uniqueElements = new Set();
    for (const element of shuffled) {
      uniqueElements.add(element);
      if (uniqueElements.size === count) break;
    }
    return Array.from(uniqueElements);
  }
}