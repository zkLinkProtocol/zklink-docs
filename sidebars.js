/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
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
      type: 'doc',
      id: 'developer',
      label: 'Developer Guide'
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
