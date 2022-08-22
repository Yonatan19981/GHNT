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

before deploying, update parameters in deploy script

to deploy to mainnet:

```shell
npx hardhat run scripts/deploy.ts
```

to deploy to another network:

```shell
npx hardhat run scripts/deploy.ts --<INSERT NETWORK NAME>
```

to deploy a custom vesting contract, first update parameters in customVest script

```shell
npx hardhat run scripts/customVest.ts --<INSERT NETWORK NAME>
```


to test

```shell
npx hardhat test
```


Author: www.yonatan.expert
link to audit: