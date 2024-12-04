// Code generated by "tsdoc-testify"; DO NOT EDIT.

import { Some, None, Option } from "rusty-option";
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_0", () => {
  let x = Some(2);
  assert.equal(x.isSome(), true);
  let y = None;
  assert.equal(y.isSome(), false);
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_1", () => {
  let x = Some(2);
  assert.equal(
    x.isSomeAnd(x => x > 1),
    true
  );
  let y = Some(0);
  assert.equal(
    y.isSomeAnd(x => x > 1),
    false
  );
  let z = None;
  assert.equal(
    z.isSomeAnd(x => x > 1),
    false
  );
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_2", () => {
  let x = Some(2);
  assert.equal(x.isNone(), false);
  let y = None;
  assert.equal(y.isNone(), true);
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_3", () => {
  let x = Some("value");
  assert.equal(x.expect("fruits are healthy"), "value");
  let y = None;
  assert.throws(() => y.expect("fruits are healthy"), "fruits are healthy");
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_4", () => {
  let x = Some("air");
  assert.equal(x.unwrap(), "air");
  let y = None;
  assert.throws(() => y.unwrap());
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_5", () => {
  assert.equal(Some("car").unwrapOr("bike"), "car");
  assert.equal(None.unwrapOr("bike"), "bike");
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_6", () => {
  let k = 10;
  assert.equal(
    Some(4).unwrapOrElse(() => 2 * k),
    4
  );
  assert.equal(
    None.unwrapOrElse(() => 2 * k),
    20
  );
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_7", () => {
  let maybe_some_string = Some("Hello, World!");
  let maybe_some_len = maybe_some_string.map(s => s.length);
  assert.deepEqual(maybe_some_len, Some(13));
  let x = None;
  assert.equal(
    x.map(s => s.length),
    None
  );
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_8", () => {
  let list = [1, 2, 3];
  let x = Option.from(list.at(1))
    .inspect(x => console.log(`got: ${x}`))
    .expect("list should be long enough");
  Option.from(list.at(5)).inspect(x => console.log(`got: ${x}`));
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_9", () => {
  let x = Some("foo");
  assert.equal(
    x.mapOr(42, v => v.length),
    3
  );
  let y = None;
  assert.equal(
    y.mapOr(42, v => v.length),
    42
  );
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_10", () => {
  let k = 21;
  let x = Some("foo");
  assert.equal(
    x.mapOrElse(
      () => 2 * k,
      v => v.length
    ),
    3
  );
  let y = None;
  assert.equal(
    y.mapOrElse(
      () => 2 * k,
      v => v.length
    ),
    42
  );
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_11", () => {
  {
    let x = Some(2);
    let y = None;
    assert.deepEqual(x.and(y), None);
  }
  {
    let x = None;
    let y = Some("foo");
    assert.deepEqual(x.and(y), None);
  }
  {
    let x = Some(2);
    let y = Some("foo");
    assert.deepEqual(x.and(y), Some("foo"));
  }
  {
    let x = None;
    let y = None;
    assert.deepEqual(x.and(y), None);
  }
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_12", () => {
  let arr_2d = [
    ["A0", "A1"],
    ["B0", "B1"]
  ];
  let item_0_1 = Option.from(arr_2d.at(0)).andThen(row =>
    Option.from(row.at(1))
  );
  assert.deepEqual(item_0_1, Some("A1"));
  let item_2_0 = Option.from(arr_2d.at(2)).andThen(row =>
    Option.from(row.at(0))
  );
  assert.deepEqual(item_2_0, None);
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_13", () => {
  function is_even(n: number): boolean {
    return n % 2 === 0;
  }
  assert.deepEqual(None.filter(is_even), None);
  assert.deepEqual(Some(3).filter(is_even), None);
  assert.deepEqual(Some(4).filter(is_even), Some(4));
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_14", () => {
  {
    let x = Some(2);
    let y = None;
    assert.deepEqual(x.or(y), Some(2));
  }
  {
    let x = None;
    let y = Some(100);
    assert.deepEqual(x.or(y), Some(100));
  }
  {
    let x = Some(2);
    let y = Some(100);
    assert.deepEqual(x.or(y), Some(2));
  }
  {
    let x = None;
    let y = None;
    assert.deepEqual(x.or(y), None);
  }
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_15", () => {
  const nobody = () => None;
  const vikings = () => Some("vikings");
  assert.deepEqual(Some("barbarians").orElse(vikings), Some("barbarians"));
  assert.deepEqual(None.orElse(vikings), Some("vikings"));
  assert.deepEqual(None.orElse(nobody), None);
});
test("/Users/sho/ghq/github.com/shqld/option-result/src/option.ts_16", () => {
  {
    let x = Some(2);
    let y = None;
    assert.deepEqual(x.xor(y), Some(2));
  }
  {
    let x = None;
    let y = Some(2);
    assert.deepEqual(x.xor(y), Some(2));
  }
  {
    let x = Some(2);
    let y = Some(2);
    assert.deepEqual(x.xor(y), None);
  }
  {
    let x = None;
    let y = None;
    assert.deepEqual(x.xor(y), None);
  }
});
