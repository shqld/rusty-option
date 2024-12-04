type Nullable<T> = T | null | undefined;

export abstract class Option<T> implements Iterable<T> {
	static Some: <T>(value: T) => Option<T>;
	static None: Option<never>;

	static from<T>(value: Nullable<T>): Option<T> {
		if (value === null || value === undefined) {
			return Option.None;
		}
		return Option.Some(value);
	}

	abstract [Symbol.iterator](): Generator<T>;

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let x = Some(2);
	 * assert.equal(x.isSome(), true);
	 *
	 * let y = None;
	 * assert.equal(y.isSome(), false);
	 * ```
	 */
	isSome(): boolean {
		for (const _ of this) {
			return true;
		}
		return false;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let x = Some(2);
	 * assert.equal(x.isSomeAnd(x => x > 1), true);
	 *
	 * let y = Some(0);
	 * assert.equal(y.isSomeAnd(x => x > 1), false);
	 *
	 * let z = None;
	 * assert.equal(z.isSomeAnd(x => x > 1), false);
	 * ```
	 */
	isSomeAnd(f: (arg: T) => boolean): boolean {
		for (const inner of this) {
			return f(inner);
		}
		return false;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let x = Some(2);
	 * assert.equal(x.isNone(), false);
	 *
	 * let y = None;
	 * assert.equal(y.isNone(), true);
	 * ```
	 */
	isNone(): boolean {
		for (const _ of this) {
			return false;
		}
		return true;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let x = Some("value");
	 * assert.equal(x.expect("fruits are healthy"), "value");
	 *
	 * let y = None;
	 * assert.throws(() => y.expect("fruits are healthy"), "fruits are healthy");
	 * ```
	 */
	expect(message: string): T {
		for (const inner of this) {
			return inner;
		}
		throw new Error(message);
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let x = Some("air");
	 * assert.equal(x.unwrap(), "air");
	 *
	 * let y = None;
	 * assert.throws(() => y.unwrap());
	 * ```
	 */
	unwrap(): T {
		for (const inner of this) {
			return inner;
		}
		throw new Error("Cannot unwrap None");
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * assert.equal(Some("car").unwrapOr("bike"), "car");
	 * assert.equal(None.unwrapOr("bike"), "bike");
	 * ```
	 */
	unwrapOr(d: T): T {
		for (const inner of this) {
			return inner;
		}
		return d;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let k = 10;
	 * assert.equal(Some(4).unwrapOrElse(() => 2 * k), 4);
	 * assert.equal(None.unwrapOrElse(() => 2 * k), 20);
	 * ```
	 */
	unwrapOrElse(f: () => T): T {
		for (const inner of this) {
			return inner;
		}
		return f();
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let maybe_some_string = Some("Hello, World!");
	 * let maybe_some_len = maybe_some_string.map(s => s.length);
	 * assert.deepEqual(maybe_some_len, Some(13));
	 *
	 * let x = None;
	 * assert.equal(x.map(s => s.length), None);
	 * ```
	 */
	map<U>(f: (arg: T) => U): Option<U> {
		for (const inner of this) {
			return Option.Some(f(inner));
		}
		return Option.None;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None, Option } from "rusty-option";
	 *
	 * let list = [1, 2, 3];
	 *
	 * // prints "got: 2"
	 * let x = Option.from(list.at(1))
	 *     .inspect(x => console.log(`got: ${x}`))
	 *     .expect("list should be long enough");
	 *
	 * // prints nothing
	 * Option.from(list.at(5)).inspect(x => console.log(`got: ${x}`));
	 * ```
	 */
	inspect(f: (arg: T) => void): Option<T> {
		for (const inner of this) {
			f(inner);
		}
		return this;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let x = Some("foo");
	 * assert.equal(x.mapOr(42, v => v.length), 3);
	 *
	 * let y = None;
	 * assert.equal(y.mapOr(42, v => v.length), 42);
	 * ```
	 */
	mapOr<U>(d: U, f: (arg: T) => U): U {
		for (const inner of this) {
			return f(inner);
		}
		return d;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let k = 21;
	 *
	 * let x = Some("foo");
	 * assert.equal(x.mapOrElse(() => 2 * k, v => v.length), 3);
	 *
	 * let y = None;
	 * assert.equal(y.mapOrElse(() => 2 * k, v => v.length), 42);
	 * ```
	 */
	mapOrElse<U>(d: () => U, f: (arg: T) => U): U {
		for (const inner of this) {
			return f(inner);
		}
		return d();
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * {
	 *   let x = Some(2);
	 *   let y = None;
	 *   assert.deepEqual(x.and(y), None);
	 * }
	 * {
	 *   let x = None;
	 *   let y = Some("foo");
	 *   assert.deepEqual(x.and(y), None);
	 * }
	 * {
	 *   let x = Some(2);
	 *   let y = Some("foo");
	 *   assert.deepEqual(x.and(y), Some("foo"));
	 * }
	 * {
	 *   let x = None;
	 *   let y = None;
	 *   assert.deepEqual(x.and(y), None);
	 * }
	 * ```
	 */
	and<U>(optb: Option<U>): Option<U> {
		for (const _ of this) {
			return optb;
		}
		return Option.None;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * let arr_2d = [["A0", "A1"], ["B0", "B1"]];
	 *
	 * let item_0_1 = Option.from(arr_2d.at(0)).andThen(row => Option.from(row.at(1)));
	 * assert.deepEqual(item_0_1, Some("A1"));
	 *
	 * let item_2_0 = Option.from(arr_2d.at(2)).andThen(row => Option.from(row.at(0)));
	 * assert.deepEqual(item_2_0, None);
	 * ```
	 */
	andThen<U>(f: (arg: T) => Option<U>): Option<U> {
		for (const inner of this) {
			return f(inner);
		}
		return Option.None;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * function is_even(n: number): boolean {
	 *     return n % 2 === 0
	 * }
	 *
	 * assert.deepEqual(None.filter(is_even), None);
	 * assert.deepEqual(Some(3).filter(is_even), None);
	 * assert.deepEqual(Some(4).filter(is_even), Some(4));
	 * ```
	 */
	filter(predicate: (arg: T) => boolean): Option<T> {
		for (const inner of this) {
			if (predicate(inner)) {
				return Option.Some(inner);
			}
		}
		return Option.None;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * {
	 *   let x = Some(2);
	 *   let y = None;
	 *   assert.deepEqual(x.or(y), Some(2));
	 * }
	 * {
	 *   let x = None;
	 *   let y = Some(100);
	 *   assert.deepEqual(x.or(y), Some(100));
	 * }
	 * {
	 *   let x = Some(2);
	 *   let y = Some(100);
	 *   assert.deepEqual(x.or(y), Some(2));
	 * }
	 * {
	 *   let x = None;
	 *   let y = None;
	 *   assert.deepEqual(x.or(y), None);
	 * }
	 * ```
	 */
	or(optb: Option<T>): Option<T> {
		for (const _ of this) {
			return this;
		}
		return optb;
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * const nobody = () => None
	 * const vikings = () => Some("vikings")
	 *
	 * assert.deepEqual(Some("barbarians").orElse(vikings), Some("barbarians"));
	 * assert.deepEqual(None.orElse(vikings), Some("vikings"));
	 * assert.deepEqual(None.orElse(nobody), None);
	 * ```
	 */
	orElse(f: () => Option<T>): Option<T> {
		for (const _ of this) {
			return this;
		}
		return f();
	}

	/**
	 * @example
	 * ```ts
	 * import { Some, None } from "rusty-option";
	 *
	 * {
	 *   let x = Some(2);
	 *   let y = None;
	 *   assert.deepEqual(x.xor(y), Some(2));
	 * }
	 * {
	 *   let x = None;
	 *   let y = Some(2);
	 *   assert.deepEqual(x.xor(y), Some(2));
	 * }
	 * {
	 *   let x = Some(2);
	 *   let y = Some(2);
	 *   assert.deepEqual(x.xor(y), None);
	 * }
	 * {
	 *   let x = None;
	 *   let y = None;
	 *   assert.deepEqual(x.xor(y), None);
	 * }
	 * ```
	 */
	xor(optb: Option<T>): Option<T> {
		for (const _ of this) {
			for (const _ of optb) {
				return Option.None;
			}
			return this;
		}
		return optb;
	}
}

class Some<T> extends Option<T> {
	private inner: T;

	constructor(inner: T) {
		super();
		this.inner = inner;
	}

	*[Symbol.iterator](): Generator<T> {
		yield this.inner;
	}
}

class None extends Option<never> {
	*[Symbol.iterator](): Generator<never> {
		//
	}
}

Option.Some = (value) => new Some(value);
// NOTE: Prevent `Some(1) instanceof Some` from returning `true`
Option.Some.prototype = {};

// NOTE: Prevents runtime errors when mistakenly used as
//       the right-hand side of an `instanceof` check and
//       prevent `None instanceof None` from returning `true`
// @ts-expect-error: ts(2332)
Option.None = () => {};
// @ts-expect-error: ts(2339)
Option.None.prototype = {};
Object.setPrototypeOf(Option.None, None.prototype);
