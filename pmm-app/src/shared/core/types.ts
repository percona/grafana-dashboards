type OpaqueTag<S extends string> = {
  readonly __tag: S;
};

export type SuperOpaque<S extends string> = OpaqueTag<S>;
export type WeakOpaque<T, S extends string> = T & OpaqueTag<S>;
export type StrongOpaque<T, S extends string> = WeakOpaque<T, S> | SuperOpaque<S>;

export type ISOTimestamp = WeakOpaque<string, 'ISOTimestamp'>;
