import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

/**
 * json fromat:
 * translation: [{}, {}]
 * user: [{}, {}]
 */

type ResourceType = 'translation' | 'user';

@Injectable()
export class JsonStorageService {
  dbPath: string = 'db.json';

  constructor() {
    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, '{"translation":[], "user": []}');
    }
  }

  get(resource: ResourceType) {
    try {
      const text = fs.readFileSync(this.dbPath, {
        encoding: 'utf-8',
      });
      const json = JSON.parse(text);
      return json[resource];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  getById(resource: ResourceType, id: string) {
    const items = this.get(resource);
    const existItem = items.find((item: any) => item.id === id);
    if (existItem) return existItem;
    else return 'Item not found';
  }
  create(resource: ResourceType, data: any) {
    try {
      const text = fs.readFileSync(this.dbPath, {
        encoding: 'utf-8',
      });
      const json = JSON.parse(text);
      json[resource].push(data);
      this.save(resource, json[resource]);
      return `${resource} created`;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  save(resource: ResourceType, data: any) {
    try {
      const text = fs.readFileSync(this.dbPath, {
        encoding: 'utf-8',
      });
      const json = JSON.parse(text);
      json[resource] = data;
      fs.writeFileSync(this.dbPath, JSON.stringify(json));
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  updateById(resource: ResourceType, id: string, data: any) {
    try {
      const items = this.get(resource);
      const index = items.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        items[index] = {
          ...items[index],
          ...data,
        };
        this.save(resource, items);
        return 'translation updated';
      } else {
        return 'not found';
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  deleteById(resource: ResourceType, id: string) {
    try {
      let items = this.get(resource);
      const index = items.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        items.splice(index, 1);
        this.save(resource, items);
        return `${resource} deleted`;
      } else {
        return 'Not found';
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
