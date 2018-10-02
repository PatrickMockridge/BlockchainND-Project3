/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256')
const leveldb = require('../utils/levelSandbox')
const Block = require('./block')

class Blockchain {
  constructor () {
    leveldb.getBlockHeight().then(num => {
      if (num === 0) {
        this.addBlock(
          new Block('First block in the chain - Genesis block')
        ).then(() => console.log('genesis block created'))
      }
    })
  }

  async addBlock (newBlock) {
    newBlock.height = await this.getBlockHeight()

    newBlock.time = new Date()
      .getTime()
      .toString()
      .slice(0, -3)

    if (newBlock.height > 0) {
      const prevBlock = await leveldb.getBlock(newBlock.height - 1)
      newBlock.previousBlockHash = prevBlock.hash
    }

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()

    await leveldb.addBlock(newBlock.height, JSON.stringify(newBlock))
  }

  async getBlockHeight () {
    const height = await leveldb.getBlockHeight()
    return height
  }

  async getBlock (blockHeight) {
    const block = await leveldb.getBlock(blockHeight)
    return block
  }

  async getChain () {
    const chain = await leveldb.getChain()
    return chain
  }

  async validateBlock (blockHeight) {
    const block = await this.getBlock(blockHeight)

    let blockHash = block.hash

    block.hash = ''

    let validBlockHash = SHA256(JSON.stringify(block)).toString()

    if (blockHash === validBlockHash) {
      console.log('Block #' + blockHeight + ' validated')
      return true
    } else {
      console.log(
        `Block #
          ${blockHeight}
          invalid hash:\n
          ${blockHash} <>
          validBlockHash`
      )
      return false
    }
  }

  async validateChain () {
    let errorLog = []
    let chainLength = await this.getBlockHeight()
    let chain = []
    for (let i = 0; i < chainLength - 1; i++) {
      const valid = await this.validateBlock(i)
      if (!valid)errorLog.push(i)

      let block = await this.getBlock(i)
      let blockHash = block.hash

      let nextBlock = await this.getBlock(i + 1)
      let previousHash = nextBlock.previousBlockHash
      block.isValid = valid

      chain.push(block)
      if (blockHash !== previousHash) {
        errorLog.push(i)
      }
    }

    if (errorLog.length > 0) {
      console.log('Block errors = ' + errorLog.length)
      console.log('Blocks: ' + errorLog)
    } else {
      console.log('No errors detected')
    }
    return chain
  }
}

module.exports = Blockchain
