import { Injectable } from '@angular/core'
import { Database, get, query, ref, set } from '@angular/fire/database'

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private db: Database) { }

    async get<T>(table: string): Promise<T> {
        return get(query(ref(this.db, table))).then(res => res.val()) as T
    }

    async set<T>(table: string, value: T) {
        return set(ref(this.db, table), value)
    }
}
