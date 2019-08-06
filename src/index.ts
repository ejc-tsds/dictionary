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

export class Dictionary<K, V> {

	private keyList: ArrayList<K>;
	private valueList: ArrayList<V>;

	public constructor() {

		this.keyList = new ArrayList<K>();
		this.valueList = new ArrayList<V>();

	}

	public size(): number {

		return this.keyList.size();

	}

	public keys(): ArrayList<K> {

		return this.keyList;

	}

	public values(): ArrayList<V> {

		return this.valueList;

	}

	public set(key: K, value: V): void {

		const index: number = this.keyList.indexOf(key);
		if (index !== -1) this.valueList.insert(value, index);
		else {

			this.keyList.add(key);
			this.valueList.add(value);

		}

	}

	public get(key: K): V | undefined {

		const index: number = this.keyList.indexOf(key);
		if (index === -1) return undefined;

		return this.valueList.get(index);

	}

	public remove(key: K): void {

		const index: number = this.keyList.indexOf(key);
		if (index === -1) return;

		this.keyList.remove(index);
		this.valueList.remove(index);

	}

	public forEach(handler: (key: K, value: V) => void): void {

		for (let i: number = 0; i < this.keyList.size(); i ++) {

			const key: K | undefined = this.keyList.get(i);
			const value: V | undefined = this.valueList.get(i);
			if (!key || !value) continue;

			handler(key, value);

		}

	}

	public async forEachSync(handler: (key: K, value: V) => Promise<void>): Promise<void> {

		for (let i: number = 0; i < this.keyList.size(); i ++) {

			const key: K | undefined = this.keyList.get(i);
			const value: V | undefined = this.valueList.get(i);
			if (!key || !value) continue;

			await handler(key, value);

		}

	}



}