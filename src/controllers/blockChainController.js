const Blockchain = require('../blockchain/blockchain')
const Block = require('../blockchain/block')
const blockChain = new Blockchain()

module.exports = {
  chain: async (req, res) => {
    const chain = await blockChain.validateChain()
    res.json(chain)
  },
  info: async (req, res) => {
    const size = await blockChain.getBlockHeight()
    res.json({
      status: true,
      message: 'The blockchain is alive!',
      size: size
    })
  },
  block: (req, res) => {
    const blockData = req.body
    if (blockData) {
      const newBlock = new Block(blockData)
      blockChain.addBlock(newBlock).then(block => {
        res.json({
          success: true,
          data: newBlock
        })
      })
    } else {
      res.statusCode = 400
      res.json({
        success: false,
        message: `400 error: Please provide block data in the body object of the request`
      })
    }
  },
  getBlock: async (req, res) => {
    try {
      const block = await blockChain.getBlock(req.params.height)
      if (block) {
        res.json({
          success: true,
          data: block
        })
      } else {
        res.statusCode = 404
        res.json({
          success: false,
          message: `404 error: block ${req.params.height} does not exist.`
        })
      }
    } catch (e) {
      res.statusCode = 500
      res.json({
        success: false,
        message: `500 error: block ${req.params.height} probably does not exist. Check block height to ensure you are requesting an existent block.`
      })
    }
  }
}
