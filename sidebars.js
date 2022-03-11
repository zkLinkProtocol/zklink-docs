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
        'Technology/PCD',
        'Technology/About-Security',
        'Technology/Roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases & Applications',
      collapsed: false,
      items: [
        'Product/Overview',
        'Product/orderbook',
        'Product/amm',
        'Product/NFT',
      ],
    },
    {
      type: 'category',
      label: 'L2 Flows',
      collapsed: false,
      items: [
        'flows/deposit',
        'flows/withdraw',
        'flows/transfer',
        'flows/limit-order',
      ],
    },
    {
      type: 'category',
      label: 'APIs',
      collapsed: false,
      items: [
        'developer/API-AMM',
        'developer/API-orderbook',
      ],
    },
    {
      type: 'doc',
      id: 'Audits',
      label: 'Audits'
    },
    {
      type: 'category',
      label: 'User Guide',
      collapsed: false,
      items: [
        'UserGuide/preparatory-work',
        'UserGuide/orderbook',
        'UserGuide/AMM-demo',
      ],
    },
    {
      type: 'doc',
      id: 'FAQ',
      label: 'FAQ'
    },
    {
      type: 'doc',
      id: 'Token Economy',
      label: 'Token Economy'
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
