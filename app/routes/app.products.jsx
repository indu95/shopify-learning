import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { authenticate } from '../shopify.server'
import { Card, Layout, Page, Text, Button, Thumbnail, Frame, Divider, Box, BlockStack, Grid } from '@shopify/polaris'
export async function loader({ request }) {
  const { admin } = await authenticate.admin(request)
  const response = await admin.graphql(`
    {
      products(first: 10) {
        nodes {
          id
          title
          description
           featuredMedia {
          preview {
            image {url}
          }
        }
          priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        }
      }
    }
  `)

  const parsedResponse = await response.json()

  return json({
    products: parsedResponse.data.products.nodes
  })
}

export default function Productpage() {
  const { products } = useLoaderData()

  return (
    <Frame>
      <Page fullWidth title={'Shopify Store Products Details'}>
        <Layout>
          <Layout.Section>
            {products.map((product) => (
              <div key={product.id}>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 2, xl: 2 }}>
                    <Box as="section" paddingInlineStart={{ xs: 400, sm: 0 }} paddingInlineEnd={{ xs: 400, sm: 0 }}>
                      <BlockStack gap="100">
                        <Thumbnail
                          source={product?.featuredMedia?.preview?.image?.url || ''}
                          alt={product?.title || 'product image'}
                        ></Thumbnail>
                      </BlockStack>
                    </Box>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 10, lg: 10, xl: 10 }}>
                    <Box as="section" paddingInlineStart={{ xs: 400, sm: 0 }} paddingInlineEnd={{ xs: 400, sm: 0 }}>
                      <BlockStack gap="100">
                        <h1>
                          <b>{product.title}</b>
                        </h1>
                        <p>{product.description}</p>
                        <div>
                          Price:
                          <b>
                            {product?.priceRangeV2?.maxVariantPrice?.currencyCode}{' '}
                            {product?.priceRangeV2?.maxVariantPrice?.amount}
                          </b>
                        </div>
                        <hr></hr>
                      </BlockStack>
                    </Box>
                  </Grid.Cell>
                </Grid>
                <div style={{ paddingBottom: '16px' }}>
                  <Divider borderColor="border" />
                </div>
              </div>
            ))}
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  )
}
