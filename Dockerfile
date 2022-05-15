FROM rust:alpine as backend
WORKDIR /home/rust/src
RUN apk --no-cache add musl-dev openssl-dev
COPY . .
RUN cargo test --release
RUN cargo build --release

FROM amd64/rust:alpine as wasm
WORKDIR /home/rust/src
RUN apk --no-cache add curl musl-dev
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
COPY . .
RUN wasm-pack build --target web letsmarkdown-wasm

FROM amd64/node:lts-alpine as frontend
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY --from=wasm /home/rust/src/letsmarkdown-wasm/pkg letsmarkdown-wasm/pkg
RUN npm ci
COPY . .
RUN npm run build

FROM scratch
COPY --from=frontend /usr/src/app/dist dist
COPY --from=backend /home/rust/src/target/release/letsmarkdown-server .
USER 1000:1000
CMD [ "./letsmarkdown-server" ]
