import { useId } from '@react-aria/utils'
import { useEffect, useState, ReactElement, ReactNode } from 'react'
import { RawTabItem, RawTabItemWithIds, TabItem } from '../types'

/**
 * Given children, the activeTabIndex, and an initialTabIndex,
 * efficiently handles validation & parsing of tab children, and...
 *
 * Returns an array of TabItem entries, each with { label, content }
 * parsed from the associated <Tab /> child, as well as
 * { tabId, panelId, isActive } properties added based on
 * activeTabIndex & initialTabIndex.
 *
 * This function also handles update logic related to tab children, namely:
 * When children change...
 *   - validates that there are 2 or more <Tab /> children
 *   - transforms children into { label, content } tabItem objects
 *   - warns if initialActiveIndex is outside the range of valid children
 *   - enriches each tabItem with a { tabId, panelId }
 * When activeTabIndex changes...
 *   - sets an isActive property on each tabItem, protecting against
 *     cases where initialActiveIndex may have been set out of range
 */
function useTabItems({
  children,
  activeTabIndex,
  initialActiveIndex,
}: {
  children: ReactNode
  activeTabIndex: number
  initialActiveIndex: number
}): TabItem[] {
  // Unique ID used to construct `tabId` & `panelId`
  const uniqueId = useId()
  // Raw items, to be validated & updated when children change
  const [rawTabItem, setRawTabItems] = useState<RawTabItem[]>([])
  // Enriched items, with { tabId, panelId, isActive }
  const [tabItems, setTabItems] = useState<TabItem[]>([])

  /**
   * When children are updated, re-validate and update tabItems
   */
  useEffect(() => {
    const validItems = validateTabChildren(children, initialActiveIndex)
    const validItemsWithIds = addTabItemIds(validItems, uniqueId)
    setRawTabItems(validItemsWithIds)
  }, [children, uniqueId, initialActiveIndex])

  /**
   * When tabItems or activeTabIndex are updated,
   * update the isActive state for each tabItem.
   */
  useEffect(() => {
    // clamp activeIndex to prevent out-of-bounds issues
    const clampedActiveIndex = Math.max(
      0,
      Math.min(activeTabIndex, rawTabItem.length - 1)
    )
    // update isActive on each item
    setTabItems(
      rawTabItem.map((item: RawTabItemWithIds, index: number) => {
        return { ...item, isActive: index == clampedActiveIndex }
      })
    )
  }, [rawTabItem, activeTabIndex])

  return tabItems
}

function addTabItemIds(
  items: RawTabItem[],
  uniqueId: string
): RawTabItemWithIds[] {
  return items.map((item: RawTabItem, index: number) => {
    const itemId = `${index}-${uniqueId}`
    const tabId = `tab-${itemId}` // tab ID, aria-labelledby on tabpanel
    const panelId = `panel-${itemId}` // panel ID, aria-controls on tab
    return { ...item, tabId, panelId }
  })
}

/**
 * Given children passed to the `<Tabs />` component,
 * validate that those children are all `<Tab />` components,
 * and that there are at least two valid children, and
 * Return an array of { label, content } items, each of which
 * represents a valid tab item.
 *
 * If invalid children are found, or if there is only one child,
 * then this function throws an error.
 */
function validateTabChildren(
  children: ReactNode,
  initialActiveIndex: number
): RawTabItem[] {
  /**
   * Disallow rendering a `Tabs` component with only one child.
   */
  if (!Array.isArray(children) || children.length === 1) {
    throw new Error('children must be an array of multiple Tab components')
  }

  /**
   * Disallow rendering children that are not a `Tab` component.
   */
  children.forEach((tabsChild: JSX.Element) => {
    const isJSXPrimitive = typeof tabsChild.type === 'string'
    const isFunctionComponent = typeof tabsChild.type === 'function'
    const isMDXComponent = typeof tabsChild.props.mdxType === 'string'

    const isTabComponent =
      !isJSXPrimitive ||
      (isFunctionComponent && tabsChild.type === 'Tab') ||
      (isMDXComponent && tabsChild.props.mdxType === 'Tab')
    if (isTabComponent) {
      return
    }

    throw new Error(
      `Found an immediate child of \`Tabs\` that is not a \`Tab\`. You can only render \`Tab\` components within \`Tabs\`. See child with props: ${JSON.stringify(
        tabsChild.props
      )}.`
    )
  })
  /**
   * Transform children into an array of { label, content } items,
   * each of which represent a valid tab item to render
   */
  const tabItems = children.map((childTab: ReactElement) => {
    const { heading, children } = childTab.props
    return { label: heading, content: children }
  })

  /**
   * If the initialActiveIndex is outside the range of possible children,
   * then log a warning, and reset it to zero
   */
  const maxValidIndex = tabItems.length - 1
  if (initialActiveIndex > maxValidIndex) {
    console.warn(
      `Warning: an out-of-range "initialActiveIndex" of "${initialActiveIndex}" was passed to a set of <Tabs /> with ${tabItems.length} valid tabs. An initial index of 0 will be used instead. Please ensure "initialActiveIndex" is between 0 and ${maxValidIndex}.`
    )
  }

  return tabItems
}

export default useTabItems