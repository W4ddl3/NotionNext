import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'

const Footer = ({ siteInfo }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='z-20 pt-2 pb-5 bg:white dark:bg-hexo-black-gray justify-center text-center w-full text-xs relative'>
      {/* <hr className='pb-2' /> */}

      {siteConfig('BEI_AN') && (
        <>
          <i className='fas fa-shield-alt' />{' '}
          <a href='https://beian.miit.gov.cn/' className='mr-2'>
            {siteConfig('BEI_AN')}
          </a>
          <br />
        </>
      )}
      <BeiAnGongAn />

      <span className='hidden busuanzi_container_site_pv'>
        <i className='text-xs fas fa-eye' />
        <span className='px-1 busuanzi_value_site_pv'> </span>{' '}
      </span>
      <span className='pl-2 hidden busuanzi_container_site_uv'>
        <i className='text-xs fas fa-users' />{' '}
        <span className='px-1 busuanzi_value_site_uv'> </span>{' '}
      </span>
      {/* <h1 className='pt-1'>{siteConfig('TITLE')}</h1> */}
    </footer>
  )
}

export default Footer
