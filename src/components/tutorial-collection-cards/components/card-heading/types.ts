import type { HeadingProps } from 'components/heading'
import { CompanyLogoOption } from './company-logo/types'

export interface CardHeadingProps {
  text: string
  level: HeadingProps['level']

  /**
   * If true, visually hide the heading element.
   */
  screenReaderOnly?: boolean
}

export { CompanyLogoOption }