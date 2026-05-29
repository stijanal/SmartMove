import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const openApiPath = path.resolve(process.cwd(), "openapi", "openapi.yaml");

export function getOpenApiYaml() {
  return fs.readFileSync(openApiPath, "utf8");
}

export function getOpenApiSpec() {
  return YAML.parse(getOpenApiYaml());
}

export function getOpenApiPath() {
  return openApiPath;
}
