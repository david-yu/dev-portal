import Head from 'next/head'
import AlertBanner from 'components/alert-banner'
import NavigationHeader from 'components/navigation-header'
import s from './base-new-layout.module.css'

/**
 * TODO: page title needs to be dynamic, but this solves some pa11y-ci errors
 * for the time being.
 */
const BaseNewLayout: React.FC = ({ children }) => {
  return (
    <div className={s.baseNewLayout}>
      <Head>
        <title>DevDot</title>
      </Head>
      <AlertBanner type="highlight">
        <p>
          You are viewing an internal preview and work in progress version of
          this site.{' '}
          <a
            href="https://airtable.com/shrU3eYHIOXO60o23"
            rel="noopener noreferrer"
            target="_blank"
          >
            We&apos;d love to hear your feedback
          </a>
          !
        </p>
      </AlertBanner>
      <NavigationHeader />
      {children}
    </div>
  )
}

export default BaseNewLayout