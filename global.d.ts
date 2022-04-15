/// <reference types="@hashicorp/platform-types" />

declare module 'swingset/page' {
  const createPage: (opts: $TSFixMe) => $TSFixMe

  export default createPage
}

declare module 'swingset/server' {
  const createStaticPaths: $TSFixMe
  const createStaticProps: $TSFixMe

  export { createStaticPaths, createStaticProps }
}

declare module '@hashicorp/react-search'

/**
 * Modules declared while enabling noImplicitAny
 */
declare module '@hashicorp/react-inline-svg'
declare module 'nprogress'
declare module 'js-cookie'
declare module '@mdx-js/react'
declare module '@hashicorp/platform-docs-mdx'
declare module '@hashicorp/react-code-block/mdx'
declare module '@hashicorp/react-code-block'
declare module '@hashicorp/react-code-block/partials/code-tabs'
declare module '@hashicorp/react-code-block/provider'
declare module '@hashicorp/react-sentinel-embedded'
declare module '@hashicorp/platform-runtime-error-monitoring'
declare module '@hashicorp/platform-util/anchor-link-analytics'
declare module 'unist-util-flatmap'
declare module '@hashicorp/react-call-to-action'
declare module '@hashicorp/react-command-line-terminal'
declare module '@hashicorp/react-text-split-with-image'
declare module '@hashicorp/react-docs-page/render-page-mdx'
declare module '@hashicorp/react-hashi-stack-menu'

/**
 * Application config, defined in environment-specific JSON files in `config/`
 */
declare const __config: Record<string, any>
