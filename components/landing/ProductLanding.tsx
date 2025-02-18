import { useRouter } from 'next/router'
import { DefaultLayout } from 'components/DefaultLayout'
import { useProductLandingContext } from 'components/context/ProductLandingContext'
import cx from 'classnames'

import { LandingHero } from 'components/landing/LandingHero'
import { FeaturedArticles } from 'components/landing/FeaturedArticles'
import { GuideCards } from 'components/landing/GuideCards'
import { SponsorsExamples } from 'components/landing/SponsorsExamples'
import { CommunityExamples } from 'components/landing/CommunityExamples'
import { CodeExamples } from 'components/landing/CodeExamples'
import { LandingSection } from 'components/landing/LandingSection'
import { useTranslation } from 'components/hooks/useTranslation'
import { ProductArticlesList } from 'components/landing/ProductArticlesList'
import { ProductReleases } from 'components/landing/ProductReleases'
import { useVersion } from 'components/hooks/useVersion'
import { RestRedirect } from 'components/RestRedirect'
import { Breadcrumbs } from 'components/page-header/Breadcrumbs'

export const ProductLanding = () => {
  const router = useRouter()
  const { isEnterpriseServer } = useVersion()
  const {
    shortTitle,
    featuredLinks,
    productUserExamples,
    productCommunityExamples,
    productCodeExamples,
  } = useProductLandingContext()
  const { t } = useTranslation('product_landing')

  return (
    <DefaultLayout>
      <div data-search="article-body">
        {router.query.productId === 'rest' && <RestRedirect />}
        <LandingSection className="pt-3">
          <div className={cx('my-3 mr-auto width-full')} data-search="breadcrumbs">
            <Breadcrumbs />
          </div>
          <LandingHero />
        </LandingSection>

        <LandingSection>
          <FeaturedArticles />
        </LandingSection>

        {productCodeExamples.length > 0 && (
          <LandingSection
            title={t('code_examples')}
            sectionLink="code-examples"
            className="my-6 pb-6"
          >
            <CodeExamples />
          </LandingSection>
        )}

        {productCommunityExamples.length > 0 && (
          <LandingSection title={t('communities_using_discussions')} className="my-6 pb-6">
            <CommunityExamples />
          </LandingSection>
        )}

        {productUserExamples.length > 0 && (
          <LandingSection title={t('sponsor_community')} className="my-6 pb-6">
            <SponsorsExamples />
          </LandingSection>
        )}

        {router.query.productId === 'admin' && isEnterpriseServer && (
          <LandingSection title={t('supported_releases')} className="my-6 pb-6">
            <ProductReleases />
          </LandingSection>
        )}

        {featuredLinks.guideCards?.length > 0 && (
          <div className="color-bg-subtle py-6">
            <LandingSection title={t('guides')} sectionLink="guides-2" className="my-6">
              <GuideCards />
            </LandingSection>
          </div>
        )}

        <LandingSection title={`All ${shortTitle} docs`} sectionLink="all-docs" className="pt-9">
          <ProductArticlesList />
        </LandingSection>
      </div>
    </DefaultLayout>
  )
}
