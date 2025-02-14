#!/bin/bash

cargo clippy

wasm-pack build --target web --release --scope choptop
