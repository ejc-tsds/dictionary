/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import { ArrayList } from "@ejc-tsds/arraylist";

export class Dictionary<K, V> implements Iterable<[K, V]>{

	private map: Map<K, V>;

	public constructor(value?: object) {

		this.map = new Map<K, V>();

		if (value) {

			for (const k in value) {

				// @ts-ignore
				const v: any = value[k];
				// @ts-ignore
				this.set(k, v);

			}

		}

	}

	public [Symbol.iterator](): Iterator<[K, V]> {

		const keys: ArrayList<K> = this.keys();
		const values: ArrayList<V> = this.values();
		let index: number = 0;

		return {
			next: (): IteratorResult<[K, V]> => {

				const key: K = keys.get(index) as K;
				const value: V = values.get(index) as V;

				index++;

				return {
					done: index === keys.size() + 1,
					value: [key, value]
				};
			}
		};
	}

	public size(): number {

		return this.map.size;

	}

	public isEmpty(): boolean {

		return this.size() === 0;

	}

	public hasKey(key: K): boolean {

		return this.map.has(key);

	}

	public hasValue(value: V): boolean {

		return this.values().contains(value);

	}

	public hasKeyValuePair(key: K, value: V): boolean {

		return this.get(key) === value;

	}

	public keys(): ArrayList<K> {

		const list: ArrayList<K> = new ArrayList<K>();
		list.fromArray(Array.from(this.map.keys()));

		return list;

	}

	public values(): ArrayList<V> {

		const list: ArrayList<V> = new ArrayList<V>();
		list.fromArray(Array.from(this.map.values()));

		return list;

	}

	public set(key: K, value: V): void {

		this.map.set(key, value);

	}

	public get(key: K): V | undefined {

		return this.map.get(key);

	}

	public remove(key: K): void {

		this.map.delete(key);

	}

	public fill(value: V, ...keys: K[]): void {

		for (const k of keys) this.set(k, value);

	}

	public clear(): void {

		this.map.clear();

	}

	public forEach(handler: (key: K, value: V) => void): void {

		for (const [k, v] of this.map) handler(k, v);

	}

	public async forEachSync(handler: (key: K, value: V) => Promise<void>): Promise<void> {

		for (const [k, v] of this.map) await handler(k, v);

	}

	public fromObject(value: object): void {

		this.map = new Map<K, V>();

		for (const k in value) {
			// @ts-ignore
			const v: any = value[k];
			// @ts-ignore
			this.map.set(k, v);
		}

	}

	public toObject(): object {

		const obj: object = {};

		this.forEach(((key: K, value: V): void => {

			// @ts-ignore
			obj[key] = value;

		}));

		return obj;
	}


}