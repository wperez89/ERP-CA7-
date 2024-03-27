import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private encryptionKey: string = environment.ENCRYPTION_KEY;
  constructor() { }

  encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.encryptionKey).toString().replace(/\//g, '-');
    return encryptedData;
  }

  decrypt(data: string): string {
    const decryptedData = CryptoJS.AES.decrypt(data.replace(/-/g, '/'), this.encryptionKey).toString(CryptoJS.enc.Utf8);
    return decryptedData
  }
}
