// Libraries
import * as React from 'react'
import marked from 'marked'

// Storybook
import {storiesOf} from '@storybook/react'
import {jsxDecorator} from 'storybook-addon-jsx'
import {withKnobs, array, text, select, boolean} from '@storybook/addon-knobs'
import {mapEnumKeys} from '../../../.storybook/utils'

// Components
import {IndexList} from './IndexList'
import {SquareButton} from '../Button/Composed/SquareButton'
import {EmptyState} from '../EmptyState/EmptyState'

// Types
import {IconFont, ComponentColor, Alignment, Sort} from '../../Types'

// Notes
const IndexListReadme = marked(require('./IndexList.md'))
const IndexListHeaderReadme = marked(require('./IndexListHeader.md'))
const IndexListHeaderCellReadme = marked(require('./IndexListHeaderCell.md'))
const IndexListBodyReadme = marked(require('./IndexListBody.md'))
const IndexListRowReadme = marked(require('./IndexListRow.md'))
const IndexListRowCellReadme = marked(require('./IndexListRowCell.md'))
const IndexListExampleReadme = marked(require('./IndexListExample.md'))

const indexListStories = storiesOf('Components|IndexList/Family', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)

const indexListExampleStories = storiesOf(
  'Components|IndexList/Examples',
  module
)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)

indexListStories.add(
  'IndexList',
  () => (
    <div className="story--example">
      <IndexList />
    </div>
  ),
  {
    readme: {
      content: IndexListReadme,
    },
  }
)

indexListStories.add(
  'IndexListHeader',
  () => (
    <div className="story--example">
      <IndexList.Header />
    </div>
  ),
  {
    readme: {
      content: IndexListHeaderReadme,
    },
  }
)

indexListStories.add(
  'IndexListHeaderCell',
  () => (
    <div className="story--example">
      <IndexList.HeaderCell
        width={text('width', '100px')}
        columnName={text('columnName', 'Name')}
        sort={Sort[select('sort', mapEnumKeys(Sort), 'None')]}
        sortKey={text('sortKey', 'name')}
        onClick={(nextSort, sortKey) =>
          alert(`Header clicked! nextSort: ${nextSort}, sortKey: ${sortKey}`)
        }
      />
    </div>
  ),
  {
    readme: {
      content: IndexListHeaderCellReadme,
    },
  }
)

indexListStories.add(
  'IndexListBody',
  () => (
    <div className="story--example">
      <IndexList.Body
        columnCount={1}
        emptyState={
          <EmptyState>
            <EmptyState.Text text="No children present" />
          </EmptyState>
        }
      />
    </div>
  ),
  {
    readme: {
      content: IndexListBodyReadme,
    },
  }
)

indexListStories.add(
  'IndexListRow',
  () => (
    <div className="story--example">
      <IndexList.Row disabled={boolean('disabled', false)} />
    </div>
  ),
  {
    readme: {
      content: IndexListRowReadme,
    },
  }
)

indexListStories.add(
  'IndexListCell',
  () => (
    <div className="story--example">
      <IndexList.Cell
        revealOnHover={boolean('revealOnHover', false)}
        alignment={
          Alignment[select('alignment', mapEnumKeys(Alignment), 'Left')]
        }
      >
        <span>
          {text('contents', 'Mitochondria are the powerhouse of the cell')}
        </span>
      </IndexList.Cell>
    </div>
  ),
  {
    readme: {
      content: IndexListRowCellReadme,
    },
  }
)

indexListExampleStories.add(
  'Simple Table',
  () => {
    const columnWidths = array('Column Widths', ['20%', '60%', '20%'])
    const exampleHeaders = array('Headers', ['Name', 'Description', ''])
    const exampleNames = array('Names', ['Apple', 'Banana', 'Orange'])
    const exampleDescriptions = array('Descriptions', [
      'Keeps doctors away',
      'A tropical yellow fruit with a creamy, starchy inside',
      'Spherical and protected by a thick peel',
    ])

    return (
      <div className="story--example">
        <IndexList>
          <IndexList.Header>
            {exampleHeaders.map((col, i) => (
              <IndexList.HeaderCell
                key={`header--${col}${i}`}
                columnName={col}
                width={columnWidths[i]}
              />
            ))}
          </IndexList.Header>
          <IndexList.Body
            emptyState={<div>Empty</div>}
            columnCount={exampleNames.length}
          >
            {exampleHeaders.map((row, i) => (
              <IndexList.Row key={`row--${row}${i}`}>
                <IndexList.Cell>{exampleNames[i]}</IndexList.Cell>
                <IndexList.Cell>{exampleDescriptions[i]}</IndexList.Cell>
                <IndexList.Cell
                  revealOnHover={true}
                  alignment={Alignment.Right}
                >
                  <SquareButton
                    icon={IconFont.Trash}
                    color={ComponentColor.Danger}
                  />
                </IndexList.Cell>
              </IndexList.Row>
            ))}
          </IndexList.Body>
        </IndexList>
      </div>
    )
  },
  {
    readme: {
      content: IndexListExampleReadme,
    },
  }
)