import { ReactElement } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Badge from 'components/badge'
import Heading from 'components/heading'
import Text from 'components/text'
import s from './hero.module.css'
import slugify from 'slugify'

type ActionProps = {
  heading: string
  description: string
  link: string
  linkText: string
  theme?: 'green' | 'purple'
}

interface HeroProps {
  badgeText?: string
  heading: string
  description: ReactElement
  actions?: Array<ActionProps>
}

export default function Hero({
  badgeText,
  heading,
  description,
  actions,
}: HeroProps) {
  const hasActions = actions?.length > 0
  return (
    <header className={classNames(s.hero, hasActions && s.withActions)}>
      <div className={s.container}>
        <div className={s.content}>
          {badgeText ? (
            <Badge text={badgeText} color="highlight" className={s.badge} />
          ) : null}
          <Heading
            className={s.title}
            level={1}
            size={500}
            weight="bold"
            slug="testing"
          >
            {heading}
          </Heading>
          <div className={s.description}>{description}</div>
        </div>

        {hasActions ? (
          <ul className={s.actions}>
            {actions.map((action, index) => {
              const slug = slugify(action.heading)
              const theme = action.theme || index === 0 ? 'green' : 'purple'
              return (
                <li key={slug} className={s.actionsItem}>
                  <article className={classNames(s.action, s[theme])}>
                    <div className={s.actionInner}>
                      <Heading
                        className={s.actionHeading}
                        level={2}
                        size={400}
                        weight="bold"
                        slug={slug}
                      >
                        {action.heading}
                      </Heading>
                      <Text className={s.actionDescription} size={200}>
                        {action.description}
                      </Text>
                      <Link href={action.link}>
                        <a className={s.actionLink}>{action.linkText}</a>
                      </Link>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </header>
  )
}
