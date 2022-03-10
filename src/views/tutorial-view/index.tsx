import Content from '@hashicorp/react-content'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { TutorialFullCollectionCtx as ClientTutorial } from 'lib/learn-client/types'
import MDX_COMPONENTS from './helpers/mdx-components'

export interface TutorialViewProps extends Omit<ClientTutorial, 'content'> {
  content: MDXRemoteSerializeResult
}

// @TODO update this interface once we have a better idea of the page needs
export default function TutorialView({
  name,
  content,
}: TutorialViewProps): React.ReactElement {
  return (
    <>
      <h1>{name}</h1>
      <main>
        <Content
          content={<MDXRemote {...content} components={MDX_COMPONENTS} />}
        />
      </main>
    </>
  )
}
