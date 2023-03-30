// type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] }

// type WithRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Required<T, K>

// type WithRequiredProp<Type, Key extends keyof Type> = Type & Required<Pick<Type, Key>>;

/** 全階層全項目必須化 */
export type ToRequiredAll<T> = {[k in keyof T]-?: T[k] extends Object ? ToRequiredAll<T[k]> : T[k]};
/** 全階層全項目任意化 */
export type ToOptionalAll<T> = {[k in keyof T]+?: T[k] extends Object ? ToOptionalAll<T[k]> : T[k]};
/** 全項目読み取り専用化 */
export type ToReadonlyAll<T> = {+readonly [k in keyof T]: T[k] extends Object ? ToReadonlyAll<T[k]> : T[k]};
/** 全階層全項目数値化 */
export type ToNumericallyAll<T> = ConvertTypeAll<T, number>;
/** 全階層全項目文字列化 */
export type ToStringifyAll<T> = ConvertTypeAll<T, string>;
/** 全階層全項目指定型変換 */
export type ConvertTypeAll<T, convType> = {[Key in keyof T]: T[Key] extends Object ? ConvertTypeAll<T[Key], convType> : convType};
/** 全項目文字列化 */
export type ConvertTo<T, convType> = {[k in keyof T]: convType};
