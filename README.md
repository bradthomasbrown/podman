# podman
This is a simple, minimal library with some Bun-specific `podman` bindings with TypeScript/JavaScript.

## Why?
Surprisingly, I wasn't able to find this as something that already exists. I may have missed something, but if it does exist, chances are it isn't simple and minimal.

## Installation
```sh
npm i @bradthomasbrown/podman
```

## Usage
```js
// a simple getter that uses --format json to get a json version of all containers
const containers = await Podman.containers;

// run command can return an id (if detached), has some vaguely helpful autocomplete types for choosing options
const id = await Podman.run([["detach"], ["publish", "8545:8545"]], "ghcr.io/foundry-rs/foundry:latest", "anvil -b 1 --host 0.0.0.0");
// d31868ff00545548d6234222c469951f0c87fc0e0b5fcb04c08c4e44ec1e25be

// can kill a container with the id retreived from a `detach` option run command
Podman.kill(id);
```