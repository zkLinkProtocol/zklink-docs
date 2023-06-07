/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  // tutorialSidebar: [
  //   {
  //     type: 'category',
  //     label: 'Tutorial',
  //     items: ['hello'],
  //   },
  // ],
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Welcome',
      collapsed: false,
      items: [
        'Introduction',
        'Background',
      ],
    },
    {
      type: 'category',
      label: 'Technology  & Design',
      collapsed: false,
      items: [
        'Technology/know-ahead',
        'Technology/Technology',
        'Technology/About-Security',
      ],
    },
        {
      type: 'category',
      label: 'Testnet',
      collapsed: false,
      items: [
        'testnet/Supported-Networks',
        'testnet/Testnet-Versions'
      ],
    },
    {
      type: 'category',
      label: 'Deposit',
      collapsed: false,
      items: [
        'deposit/deposit'
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: false,
      items: [
        'Product/orderbook',
        'Product/NFT',
        'Product/amm'
      ],
    },
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        'developer/API-orderbook',
        'developer/API-AMM'
      ],
    },
    {
      type: 'doc',
      id: 'Audits',
      label: 'Audits'
    },
    {
      type: 'doc',
      id: 'Token Economy',
      label: 'Tokenomics'
    },
    {
      type: 'doc',
      id: 'Smart Contract',
      label: 'Smart Contract'
    },
    {
      type: 'doc',
      id: 'community',
      label: 'Community'
    }
  ]
};
