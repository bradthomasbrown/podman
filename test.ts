import { Client } from "../jra/src/jra";
import { Podman } from "./src/podman";

const id = await Podman.run([["detach"], ["publish", "8545:8545"]], "ethereum/client-go", ["--dev", "--http", "--http.addr", "0.0.0.0", "--http.api", "eth,debug"]);
await new Promise(r => setTimeout(r, 100));
const client = new Client("localhost:8545");
const result = await client.request("eth_blockNumber", [], "eth_chainId", []).catch(e => e as Error|AggregateError);
if (result instanceof AggregateError) {
    if (result.message !== undefined) {
        console.error(result.message);
        console.log(result.stack);
    }
    for (const error of result.errors) {
        console.error(error.message);
        console.dir({ cause:error.cause }, { depth:null });
    }
    await Podman.remove([["force"]], id);
    process.exit(1);
}
if (result instanceof Error) {
    await Podman.remove([["force"]], id);
    console.error(result.message);
    console.log(result.stack);
    process.exit(1);
}
const [blockNumber, chainId] = result;
console.log({ blockNumber, chainId });
await Podman.remove([["force"]], id);

export {};