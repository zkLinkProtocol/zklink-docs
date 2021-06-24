/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'zkLink',
  tagline: 'zkLink are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'zkLink-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'zkLink',
      logo: {
        alt: 'My Site Logo',
        src: 'img/index-logo.png',
      },
      items: [
        {
          href: 'https://zk.link',
          label: 'Home',
          position: 'left',
          target: '_self'
        },
        {
          type: 'doc',
          docId: 'Introduction',
          position: 'left',
          label: 'docs',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/zklinkprotocol',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/Introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/zkLinkorg',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/9GCwxN7xaJ',
            },
            {
              label: 'Medium',
              href: 'https://zklinkdefi.medium.com',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/zkLinkorg',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/zklinkprotocol',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} zkLink, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
