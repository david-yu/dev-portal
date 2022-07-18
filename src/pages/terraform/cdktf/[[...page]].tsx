import terraformData from 'data/terraform.json'
import { ProductData } from 'types/products'
import { getStaticGenerationFunctions } from 'views/docs-view/server'
import DocsView from 'views/docs-view'

const basePath = 'cdktf'
const baseName = 'CDKTF'
const product = terraformData as ProductData
const productSlugForLoader = 'terraform-cdk'

const { getStaticPaths, getStaticProps } = getStaticGenerationFunctions({
	product,
	productSlugForLoader,
	basePath,
	baseName,
})

export { getStaticPaths, getStaticProps }
export default DocsView