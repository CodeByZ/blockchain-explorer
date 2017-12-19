import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() {
    }

    public getItem(key: string): Promise<string | null> {
        return new Promise(resolve => {
            const value = localStorage.getItem(key);
            resolve(value);
        });
    }

    public setItem(key: string, value: string) : Promise<void> {
        return new Promise(resolve => {
            localStorage.setItem(key, value);
            resolve();
        });
    }

    public removeItem(key: string) : Promise<void> {
        return new Promise(resolve => {
            localStorage.removeItem(key);
            resolve();
        });
    }

}
