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
        'Cross-chain Pairs',
      ],
    },
    {
      type: 'category',
      label: 'Product',
      collapsed: false,
      items: [
        'Product/Overview',
        'Product/fastswap',
        'Product/product-2 Stable coins',
      ],
    },
    {
      type: 'category',
      label: 'Technology',
      collapsed: false,
      items: [
        'Technology/Multi-Chain',
        'Technology/zkLink-Protocol',
        'Technology/State&Operation',
        'Technology/ZK-Rollup',
        'Technology/UniswapV3',
      ],
    },
    {
      type: 'category',
      label: 'Testnet User Guide',
      collapsed: true,
      items: [
        'UserGuide/EN',
        'UserGuide/es',
        'UserGuide/pt',
        'UserGuide/ru',
        'UserGuide/ko',
        'UserGuide/ja',
        'UserGuide/zh-TW',
        'UserGuide/zh-CN',
      ],
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
      id: 'FAQ',
      label: 'FAQ'
    }
  ]
};
