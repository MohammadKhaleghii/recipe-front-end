export interface ParamsBase {
  type: "public" | "user" | "any";
  app_id: string;
  app_key: string;
  beta: boolean;
}
