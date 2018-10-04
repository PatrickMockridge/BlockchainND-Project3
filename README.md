### About
This project demonstrates a simple private blockchain API in a local development environment using NodeJS, Express and LevelDB. This project was completed to fulfil the requirements of Project 2 and Project 3 (unintentionally) of the [Udacity Blockchain Developer Nanodegree](https://eu.udacity.com/course/blockchain-developer-nanodegree--nd1309).

### Requirements
* [Yarn: 1.10.1](https://yarnpkg.org)
* [express](https://www.express.com)
* [LevelDB](http://https://github.com/google/leveldb)
* [Nodemon](https://github.com/remy/nodemon)

## Usage

### Installation

## Run App

```sh
git clone https://github.com/PatrickMockridge/BlockchainND-Project2.git
cd BlockchainND-Project2
yarn install
```

This installs the Node dependencies of the project.

### Start API server
```sh
yarn start
```
This starts the API server, listening on port 8000.

### Endpoints

The API endpoints implemented to fulfil the [Project Rubric](https://review.udacity.com/#!/rubrics/2040/view) are:

### GET /info

Example output:
```json
{
  "status": true,
  "message": "The Blockchain is alive!",
  "size": 3
}
```

### POST /block

Example input:
```json
{
  "body": "This is a test"
}
```

Example output:
```json
{
    "success": true,
    "data": {
      "hash": "ebabc59a6d8d3436ed298d1602b067fa041c1c5944c68d928e20e8a3b4727748",
      "height": 4,
      "body" : "This is a test",
      "time": "1538499335",
      "previousBlockHash": "bccf09bcc51b3eedf7f5486a20c0053e384e9bb630701648c4e018bc5a89772b"
    }
}
```

### GET /chain

Example output:
```json
[
  {
    "hash": "bf8c0a574701a7598b95c11d6574c08bb70378fcf6992b86974db8d852fea875",
    "height": 0,
    "body": "First block in the chain - Genesis block",
    "time": "1538486754",
    "previousBlockHash": "",
    "isValid": true
  },
  {
    "hash": "8d8e80393afcb2a4bff938e63e6816efc8d915f6d67a34252470f61fd95b1426",
    "height": 1,
    "body": "String Test",
    "time": "1538495621",
    "previousBlockHash": "bf8c0a574701a7598b95c11d6574c08bb70378fcf6992b86974db8d852fea875",
    "isValid": true
  },
  {
    "hash": "2c2b4548d465be5acaddffde4691d6afd9f9ec8945aa62348769c40a6c0d9f2d",
    "height": 2,
    "body": "String Test 2",
    "time": "1538496614",
    "previousBlockHash": "8d8e80393afcb2a4bff938e63e6816efc8d915f6d67a34252470f61fd95b1426",
    "isValid": true
  },
  {
    "hash": "bccf09bcc51b3eedf7f5486a20c0053e384e9bb630701648c4e018bc5a89772b",
    "height": 3,
    "body": "String Test 3",
    "time": "1538497340",
    "previousBlockHash": "2c2b4548d465be5acaddffde4691d6afd9f9ec8945aa62348769c40a6c0d9f2d",
    "isValid": true
  }
]
```

### GET /block/{height}

Example output:
```json
{
  "success": true,
  "data": {
    "hash": "bccf09bcc51b3eedf7f5486a20c0053e384e9bb630701648c4e018bc5a89772b",
    "height": 3,
    "body": "String Test 3",
    "time": "1538497340",
    "previousBlockHash": "2c2b4548d465be5acaddffde4691d6afd9f9ec8945aa62348769c40a6c0d9f2d"
  }
}
```
