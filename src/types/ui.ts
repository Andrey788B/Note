export type StringChangeHandler = (v: string) => void;

export type SearchBoxProps = {
  value: string;
  onChange: StringChangeHandler;
};