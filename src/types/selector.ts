export type Chemical = {
  id: number | string;
  chemical: string;
  flammable: boolean;
  tube: string | null;
  shaft: string | null;
  seal: string | null;
};

export type Container = {
  id: number | string;
  name: string;
  volume: string;
  max_depth: string;
};

export type SelectorState = {
  chemical: Chemical;
  container: Container;
};
