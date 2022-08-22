# GeoHunt Project Smart Contracts

To run:
-Clone repo : git clone https://github.com/Yonatan19981/GHNT.git
-Open terminal in folder
-Run "npx install"
-Add ".env" which includes MNEMONIC , INFURA_KEY and PRIVATE_KEY

to compile:
```shell
npx hardhat compile
```

before deploying, update ratio (ratio of ICO tokens BNB to tokens), amount (minimum number of tokens to buy) and _main (the account which will recieve 6 billion geohunt tokens)

to deploy to mainnet:

```shell
npx hardhat run scripts/deploy.ts
```

to deploy to another network:

```shell
npx hardhat run scripts/deploy.ts --<INSERT NETWORK NAME>
```

Author: www.yonatan.expert
link to audit: