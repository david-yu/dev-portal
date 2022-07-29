import Link from 'next/link'
import BaseNewLayout from 'layouts/base-new'
import getProductPageContent from 'views/product-tutorials-view/helpers/get-product-page-content'
import Heading from 'components/heading'
import ProductViewContent from 'views/product-tutorials-view/components/product-view-content'
import { getCollectionsBySection } from 'lib/learn-client/api/collection'
import { stripUndefinedProperties } from 'lib/strip-undefined-props'

export const WAF_SLUG = 'well-architected-framework'

// TODO - figure out betta API solution to serve sidebar data
// right now its fetching ALL collections and filtering based on the slug
export default function WellArchitectedFrameworkLanding(props) {
	const { pageData, inlineCollections, inlineTutorials, allTopicCollections } =
		props.content
	return (
		<>
			<Heading level={1} size={500} weight="bold">
				{pageData.title}
			</Heading>
			<ProductViewContent
				blocks={pageData.blocks}
				inlineCollections={inlineCollections}
				inlineTutorials={inlineTutorials}
			/>
			<_tempCollectionSidebarPlaceholder collections={allTopicCollections} />
		</>
	)
}

export function _tempCollectionSidebarPlaceholder({ collections }) {
	return (
		<>
			<Heading level={1} size={500} weight="bold">
				All Collections
			</Heading>
			<ul>
				{collections.map((collection) => (
					<li key={collection.id}>
						<Link href={`/${collection.slug}`}>
							<a>{collection.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export async function getStaticProps() {
	const pageContent = await getProductPageContent(WAF_SLUG)
	const wafCollections = await getCollectionsBySection(WAF_SLUG)

	return {
		props: stripUndefinedProperties({
			content: { ...pageContent, allTopicCollections: wafCollections },
		}),
	}
}

WellArchitectedFrameworkLanding.layout = BaseNewLayout
