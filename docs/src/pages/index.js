// @flow

import React from 'react'
import glamorous from 'glamorous'
import { Motion, spring } from 'react-motion'
import 'prismjs'
import 'prismjs/components/prism-jsx'
import { PrismCode } from 'react-prism'

import { Container, Row, Col } from '../../../src'
import Delay from '../Delay'

const Card = glamorous.div({
  position: 'relative',
  padding: 24,
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  border: '1px solid #eee',
  borderRadius: 3,
  boxShadow: '0 2px 4px 0 rgba(25, 29, 34, 0.1)'
})

const Example = glamorous.div({
  border: '1px solid #eee',
  borderRadius: 3,
  padding: 15,
  '& > div': { // container
    '& > div': { // Row
      '& > div': { // Col
        backgroundColor: 'white',
        border: '1px solid #eee',
        paddingTop: 15,
        paddingBottom: 15
      }
    }
  }
})

const Code = props => <PrismCode component="pre" className="language-jsx" {...props} />

const CardAnimation = ({ children }: any) => (
  <Delay initial={1} value={0} period={300}>
    {delayed => (
      <Motion
        defaultStyle={{ top: 50, opacity: 0 }}
        style={{
          top: spring(delayed * 50, { stiffness: 80, damping: 17 }),
          opacity: spring(delayed === 1 ? 0 : 1)
        }}
      >
        {style => (
          <Card
            style={{
              top: style.top,
              opacity: style.opacity
            }}
          >
            {children}
          </Card>
        )}
      </Motion>
    )}
  </Delay>
)

const IndexPage = () => (
  <Container pt={24}>
    <Row>
      <Col span={{ xs: 1, lg: 10/12, xl: 8/12 }} offset={{ xs: 0, lg: 1/12, xl: 2/12 }}>
        <Row>
          <Col span={1} mb={24}>
            <CardAnimation>
              <h2>Introduction</h2>
              <p>
                Inspired by <a href="https://v4-alpha.getbootstrap.com/layout/grid/">Bootstrap</a>, <code>glamorous-grid</code> exposes several React components to make a versatile and customizable flexbox grid system.
              </p>
              <h5>Core Features</h5>
              <ul>
                <li>
                  Infinite columns. Supports any number of columns.
                  6 column grid system, 12, 200, etc.
                </li>
                <li>
                  Default breakpoints match Bootstrap, but can be customized via the theme.
                  You can also have any number of breakpoints, not just the default 5.
                </li>
                <li>
                  Extra utility props for offsets, alignment, and margin/padding spacing.
                </li>
              </ul>
            </CardAnimation>
          </Col>

          <Col span={1} mb={24}>
            <CardAnimation>
              <h5>Basic Usage</h5>
              <PrismCode component="pre" className="language-bash">npm install glamorous-grid</PrismCode>
              <PrismCode component="pre" className="language-javascript">
                {`import { Container, Row, Col } from 'glamorous-grid'

function MyComponent(props) => {
  return (
    <Container>
      <Row>
        <Col>
          Hello world!
        </Col>
      </Row>
    </Container>
  )
}
`}
              </PrismCode>
              <p>
                <code>glamorous-grid</code> exports three
                components: <code>Container</code>, <code>Row</code>, and <code>Col</code>.
              </p>
              <ul>
                <li>
                  <code>Container</code> helps center your content.
                  By default, this will be centered in a fixed width that
                  changes per breakpoint. Use the prop <code>fluid</code> to
                  have the container span its full width.
                </li>
                <li>
                  <code>Row</code> represents a group of content.
                  It does not necessarily represent a horizontal group of content,
                  since columns can wrap, but often times it does.
                  The only direct children of a <code>Row</code> can be one or
                  more <code>Col</code>.
                </li>
                <li>
                  <code>Col</code> is where all your content goes.
                  You can specify its width to line up to a grid.
                </li>
              </ul>

              <h6>Example</h6>
              <Example>
                <Container>
                  <Row>
                    <Col>Column 1 of 3</Col>
                    <Col>Column 2 of 3</Col>
                    <Col>Column 3 of 3</Col>
                  </Row>
                </Container>
              </Example>

              <Code>
                {`<Container>
  <Row>
    <Col>Column 1 of 3</Col>
    <Col>Column 2 of 3</Col>
    <Col>Column 3 of 3</Col>
  </Row>
</Container>`}
              </Code>
            </CardAnimation>
          </Col>

          <Col span={1} mb={24}>
            <CardAnimation>
              <h5>Span and breakpoints</h5>
              <p>
                The default breakpoints
                are <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>,
                and <code>xl</code>. All props can take either a primitive value,
                such as <code>20px</code> or <code>1em</code>, or
                an object mapping primitive values to a specific breakpoint.
              </p>

              <h6>Example</h6>
              <Example>
                <Container>
                  <Row>
                    <Col span={{ xs: 2/12, lg: 6/12 }}>span 2, lg 6</Col>
                    <Col span={{ xs: 5/12, lg: 3/12 }}>span 5, lg 3</Col>
                    <Col span={{ xs: 5/12, lg: 3/12 }}>span 5, lg 3</Col>
                  </Row>
                </Container>
              </Example>

              <Code>
                {`<Container>
  <Row>
    <Col span={{ xs: 2/12, lg: 6/12 }}>span 2, lg 6</Col>
    <Col span={{ xs: 5/12, lg: 3/12 }}>span 5, lg 3</Col>
    <Col span={{ xs: 5/12, lg: 3/12 }}>span 5, lg 3</Col>
  </Row>
</Container>`}
              </Code>

              <p>
                If you specify <code>span</code> for only <code>md</code>,
                but not for any breakpoint below, column width will be 100%
                below the <code>md</code> breakpoint.
              </p>

              <h6>Example</h6>
              <Example>
                <Container>
                  <Row>
                    <Col span={{ md: 4/12 }}>md 4</Col>
                    <Col span={{ md: 4/12 }}>md 4</Col>
                    <Col span={{ md: 4/12 }}>md 4</Col>
                  </Row>
                </Container>
              </Example>

              <Code>
                {`<Container>
  <Row>
    <Col span={{ md: 4/12 }}>md 4</Col>
    <Col span={{ md: 4/12 }}>md 4</Col>
    <Col span={{ md: 4/12 }}>md 4</Col>
  </Row>
</Container>`}
              </Code>
            </CardAnimation>
          </Col>

          <Col span={1} mb={24}>
            <CardAnimation>
              <h5>Variable width content</h5>

              <p>Use the <code>auto</code> prop on <code>Col</code> for variable content width.</p>

              <h6>Example</h6>
              <Example>
                <Container>
                  <Row justifyContent={{ md: 'center' }} mb={12}>
                    <Col span={{ lg: 2/12 }}>1 of 3</Col>
                    <Col span={12/12} auto={{ md: true }}>Just some variable width content</Col>
                    <Col span={{ lg: 2/12 }}>3 of 3</Col>
                  </Row>
                  <Row>
                    <Col>1 of 3</Col>
                    <Col span={12/12} auto={{ md: true }}>Just some variable width content</Col>
                    <Col span={{ lg: 2/12 }}>3 of 3</Col>
                  </Row>
                </Container>
              </Example>

              <Code>
                {`<Container>
  <Row justifyContent={{ md: 'center' }} mb={12}>
    <Col span={{ lg: 2/12 }}>1 of 3</Col>
    <Col span={12/12} auto={{ md: true }}>Just some variable width content</Col>
    <Col span={{ lg: 2/12 }}>3 of 3</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col span={12/12} auto={{ md: true }}>Just some variable width content</Col>
    <Col span={{ lg: 2/12 }}>3 of 3</Col>
  </Row>
</Container>`}
              </Code>
            </CardAnimation>
          </Col>

          <Col span={1} mb={24}>
            <CardAnimation>
              <h5>Vertical Alignment</h5>

              <p>
                The props <code>alignItems</code> (on Row) and <code>alignSelf</code> (on Col)
                can be used for adjusting the position of columns:
              </p>

              <h6>Example</h6>
              <Example>
                <Container>
                  <Row style={{ minHeight: 100, background: 'rgb(248, 248, 248)' }}>
                    <Col>Default Alignment Stretch, 1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                  </Row>
                  <Row alignItems={{ md: 'start' }} mt={16} style={{ minHeight: 100, background: 'rgb(248, 248, 248)' }}>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                  <Row alignItems={{ md: 'center' }} mt={16} style={{ minHeight: 100, background: 'rgb(248, 248, 248)' }}>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                  <Row alignItems={{ md: 'end' }} mt={16} style={{ minHeight: 100, background: 'rgb(248, 248, 248)' }}>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                  <Row mt={16} style={{ minHeight: 100, background: 'rgb(248, 248, 248)' }}>
                    <Col alignSelf={{ md: 'start' }}>1 of 3</Col>
                    <Col alignSelf={{ md: 'center' }}>2 of 3</Col>
                    <Col alignSelf={{ md: 'end' }}>3 of 3</Col>
                  </Row>
                </Container>
              </Example>

              <Code>
                {`import { Container, Row, Col } from 'glamorous-grid'

const RowSpaced = glamorous(Row)({
  minHeight: 100,
  background: 'rgb(248, 248, 248)'
})

<Container>
  <RowSpaced>
    <Col>Default Alignment Stretch, 1</Col>
    <Col>2</Col>
    <Col>3</Col>
  </RowSpaced>
  <RowSpaced alignItems={{ md: 'start' }}>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </RowSpaced>
  <RowSpaced alignItems={{ md: 'center' }} mt={16}>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </RowSpaced>
  <RowSpaced alignItems={{ md: 'end' }} mt={16}>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </RowSpaced>
  <RowSpaced mt={16}>
    <Col alignSelf={{ md: 'start' }}>1 of 3</Col>
    <Col alignSelf={{ md: 'center' }}>2 of 3</Col>
    <Col alignSelf={{ md: 'end' }}>3 of 3</Col>
  </RowSpaced>
</Container>`}
              </Code>
            </CardAnimation>
          </Col>

          <Col span={1} mb={24}>
            <CardAnimation>
              <h5>Horizontal Alignment</h5>

              <p>
                The <code>Row</code> prop <code>justifyContent</code> can be used to
                adjust the horizontal alignment of columns.
              </p>

              <h6>Example</h6>
              <Example>
                <Container>
                  <Row justifyContent="start">
                    <Col span={4/12}>1 of 2 columns</Col>
                    <Col span={4/12}>2 of 2 columns</Col>
                  </Row>
                  <Row justifyContent="center">
                    <Col span={4/12}>1 of 2 columns</Col>
                    <Col span={4/12}>2 of 2 columns</Col>
                  </Row>
                  <Row justifyContent="end">
                    <Col span={4/12}>1 of 2 columns</Col>
                    <Col span={4/12}>2 of 2 columns</Col>
                  </Row>
                  <Row justifyContent="around">
                    <Col span={4/12}>1 of 2 columns</Col>
                    <Col span={4/12}>2 of 2 columns</Col>
                  </Row>
                  <Row justifyContent="between">
                    <Col span={4/12}>1 of 2 columns</Col>
                    <Col span={4/12}>2 of 2 columns</Col>
                  </Row>
                </Container>
              </Example>

              <Code>
                {`<Container>
  <Row justifyContent="start">
    <Col span={4/12}>1 of 2 columns</Col>
    <Col span={4/12}>2 of 2 columns</Col>
  </Row>
  <Row justifyContent="center">
    <Col span={4/12}>1 of 2 columns</Col>
    <Col span={4/12}>2 of 2 columns</Col>
  </Row>
  <Row justifyContent="end">
    <Col span={4/12}>1 of 2 columns</Col>
    <Col span={4/12}>2 of 2 columns</Col>
  </Row>
  <Row justifyContent="around">
    <Col span={4/12}>1 of 2 columns</Col>
    <Col span={4/12}>2 of 2 columns</Col>
  </Row>
  <Row justifyContent="between">
    <Col span={4/12}>1 of 2 columns</Col>
    <Col span={4/12}>2 of 2 columns</Col>
  </Row>
</Container>`}
              </Code>
            </CardAnimation>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
)

export default IndexPage
