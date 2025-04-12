import { siteConfig } from '@/lib/config'
import { convertInnerUrl } from '@/lib/notion/convertInnerUrl'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GlobalStyle } from './GlobalStyle'
import { initGoogleAdsense } from './GoogleAdsense'

import Head from 'next/head'
import ExternalScript from './ExternalScript'
import WebWhiz from './Webwhiz'
import { useGlobal } from '@/lib/global'
import IconFont from './IconFont'


/**
 * 各种插件脚本
 * @param {*} props
 * @returns
 */
const ExternalPlugin = props => {
  // 读取自Notion的配置
  const { NOTION_CONFIG } = props
  const {lang} = useGlobal()
  const DISABLE_PLUGIN = siteConfig('DISABLE_PLUGIN', null, NOTION_CONFIG)
  const THEME_SWITCH = siteConfig('THEME_SWITCH', null, NOTION_CONFIG)
  const DEBUG = siteConfig('DEBUG', null, NOTION_CONFIG)
  const ANALYTICS_ACKEE_TRACKER = siteConfig(
    'ANALYTICS_ACKEE_TRACKER',
    null,
    NOTION_CONFIG
  )
  const ANALYTICS_VERCEL = siteConfig('ANALYTICS_VERCEL', null, NOTION_CONFIG)
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig(
    'ANALYTICS_BUSUANZI_ENABLE',
    null,
    NOTION_CONFIG
  )
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID', null, NOTION_CONFIG)
  const FACEBOOK_APP_ID = siteConfig('FACEBOOK_APP_ID', null, NOTION_CONFIG)
  const FACEBOOK_PAGE_ID = siteConfig('FACEBOOK_PAGE_ID', null, NOTION_CONFIG)
  const FIREWORKS = siteConfig('FIREWORKS', null, NOTION_CONFIG)
  const SAKURA = siteConfig('SAKURA', null, NOTION_CONFIG)
  const STARRY_SKY = siteConfig('STARRY_SKY', null, NOTION_CONFIG)
  const MUSIC_PLAYER = siteConfig('MUSIC_PLAYER', null, NOTION_CONFIG)
  const NEST = siteConfig('NEST', null, NOTION_CONFIG)
  const FLUTTERINGRIBBON = siteConfig('FLUTTERINGRIBBON', null, NOTION_CONFIG)
  const COMMENT_TWIKOO_COUNT_ENABLE = siteConfig(
    'COMMENT_TWIKOO_COUNT_ENABLE',
    null,
    NOTION_CONFIG
  )
  const RIBBON = siteConfig('RIBBON', null, NOTION_CONFIG)
  const CUSTOM_RIGHT_CLICK_CONTEXT_MENU = siteConfig(
    'CUSTOM_RIGHT_CLICK_CONTEXT_MENU',
    null,
    NOTION_CONFIG
  )
  const CAN_COPY = siteConfig('CAN_COPY', null, NOTION_CONFIG)
  const WEB_WHIZ_ENABLED = siteConfig('WEB_WHIZ_ENABLED', null, NOTION_CONFIG)
  const AD_WWADS_BLOCK_DETECT = siteConfig(
    'AD_WWADS_BLOCK_DETECT',
    null,
    NOTION_CONFIG
  )
  const CHATBASE_ID = siteConfig('CHATBASE_ID', null, NOTION_CONFIG)
  const COMMENT_DAO_VOICE_ID = siteConfig(
    'COMMENT_DAO_VOICE_ID',
    null,
    NOTION_CONFIG
  )
  const AD_WWADS_ID = siteConfig('AD_WWADS_ID', null, NOTION_CONFIG)
  const COMMENT_ARTALK_SERVER = siteConfig(
    'COMMENT_ARTALK_SERVER',
    null,
    NOTION_CONFIG
  )
  const COMMENT_ARTALK_JS = siteConfig('COMMENT_ARTALK_JS', null, NOTION_CONFIG)
  const COMMENT_TIDIO_ID = siteConfig('COMMENT_TIDIO_ID', null, NOTION_CONFIG)
  const COMMENT_GITTER_ROOM = siteConfig(
    'COMMENT_GITTER_ROOM',
    null,
    NOTION_CONFIG
  )
  const ANALYTICS_BAIDU_ID = siteConfig(
    'ANALYTICS_BAIDU_ID',
    null,
    NOTION_CONFIG
  )
  const ANALYTICS_CNZZ_ID = siteConfig('ANALYTICS_CNZZ_ID', null, NOTION_CONFIG)
  const ANALYTICS_GOOGLE_ID = siteConfig(
    'ANALYTICS_GOOGLE_ID',
    null,
    NOTION_CONFIG
  )
  const MATOMO_HOST_URL = siteConfig('MATOMO_HOST_URL', null, NOTION_CONFIG)
  const MATOMO_SITE_ID = siteConfig('MATOMO_SITE_ID', null, NOTION_CONFIG)
  const ANALYTICS_51LA_ID = siteConfig('ANALYTICS_51LA_ID', null, NOTION_CONFIG)
  const ANALYTICS_51LA_CK = siteConfig('ANALYTICS_51LA_CK', null, NOTION_CONFIG)
  const DIFY_CHATBOT_ENABLED = siteConfig(
    'DIFY_CHATBOT_ENABLED',
    null,
    NOTION_CONFIG
  )
  const TIANLI_KEY = siteConfig('TianliGPT_KEY', null, NOTION_CONFIG)
  const GLOBAL_JS = siteConfig('GLOBAL_JS', '', NOTION_CONFIG)
  const CLARITY_ID = siteConfig('CLARITY_ID', null, NOTION_CONFIG)
  const IMG_SHADOW = siteConfig('IMG_SHADOW', null, NOTION_CONFIG)
  const ANIMATE_CSS_URL = siteConfig('ANIMATE_CSS_URL', null, NOTION_CONFIG)
  const MOUSE_FOLLOW = siteConfig('MOUSE_FOLLOW', null, NOTION_CONFIG)
  const CUSTOM_EXTERNAL_CSS = siteConfig(
    'CUSTOM_EXTERNAL_CSS',
    null,
    NOTION_CONFIG
  )
  const CUSTOM_EXTERNAL_JS = siteConfig(
    'CUSTOM_EXTERNAL_JS',
    null,
    NOTION_CONFIG
  )
  // 默认关闭NProgress
  const ENABLE_NPROGRSS = siteConfig('ENABLE_NPROGRSS', false)
  const COZE_BOT_ID = siteConfig('COZE_BOT_ID')
  const HILLTOP_ADS_META_ID = siteConfig(
    'HILLTOP_ADS_META_ID',
    null,
    NOTION_CONFIG
  )

  const ENABLE_ICON_FONT = siteConfig('ENABLE_ICON_FONT', false)

  // 自定义样式css和js引入
  if (isBrowser) {
    // 初始化AOS动画
    // 静态导入本地自定义样式
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    // 自动添加图片阴影
    if (IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    if (ANIMATE_CSS_URL) {
      loadExternalResource(ANIMATE_CSS_URL, 'css')
    }

    // 导入外部自定义脚本
    if (CUSTOM_EXTERNAL_JS && CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    // 导入外部自定义样式
    if (CUSTOM_EXTERNAL_CSS && CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }

  const router = useRouter()
  useEffect(() => {
    // 异步渲染谷歌广告
    if (ADSENSE_GOOGLE_ID) {
      setTimeout(() => {
        initGoogleAdsense(ADSENSE_GOOGLE_ID)
      }, 3000)
    }

    setTimeout(() => {
      // 映射url
      convertInnerUrl({ allPages:props?.allNavPages, lang:lang })
    }, 500)
  }, [router])

  useEffect(() => {
    // 执行注入脚本
    // eslint-disable-next-line no-eval
    eval(GLOBAL_JS)
  }, [])

  if (DISABLE_PLUGIN) {
    return null
  }

  return (
    <>
      {/* 全局样式嵌入 */}
      <GlobalStyle />
      {ENABLE_ICON_FONT && <IconFont />}
      {MOUSE_FOLLOW && <MouseFollow />}
      {THEME_SWITCH && <ThemeSwitch />}
      {DEBUG && <DebugPanel />}
      {ANALYTICS_ACKEE_TRACKER && <Ackee />}
      {ANALYTICS_GOOGLE_ID && <Gtag />}
      {ANALYTICS_VERCEL && <Analytics />}
      {ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      {FACEBOOK_APP_ID && FACEBOOK_PAGE_ID && <Messenger />}
      {FIREWORKS && <Fireworks />}
      {SAKURA && <Sakura />}
      {STARRY_SKY && <StarrySky />}
      {MUSIC_PLAYER && <MusicPlayer />}
      {NEST && <Nest />}
      {FLUTTERINGRIBBON && <FlutteringRibbon />}
      {COMMENT_TWIKOO_COUNT_ENABLE && <TwikooCommentCounter {...props} />}
      {RIBBON && <Ribbon />}
      {DIFY_CHATBOT_ENABLED && <DifyChatbot />}
      {CUSTOM_RIGHT_CLICK_CONTEXT_MENU && <CustomContextMenu {...props} />}
      {!CAN_COPY && <DisableCopy />}
      {WEB_WHIZ_ENABLED && <WebWhiz />}
      {AD_WWADS_BLOCK_DETECT && <AdBlockDetect />}
      {TIANLI_KEY && <TianliGPT />}
      <VConsole />
      {ENABLE_NPROGRSS && <LoadingProgress />}
      <AosAnimation />
      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && <LA51 />}
      {COZE_BOT_ID && <Coze />}

      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && (
        <>
          <script id='LA_COLLECT' src='//sdk.51.la/js-sdk-pro.min.js' defer />
          {/* <script async dangerouslySetInnerHTML={{
              __html: `
                    LA.init({id:"${ANALYTICS_51LA_ID}",ck:"${ANALYTICS_51LA_CK}",hashMode:true,autoTrack:true})
                    `
            }} /> */}
        </>
      )}

      {CHATBASE_ID && (
        <>
          <script
            id={CHATBASE_ID}
            src='https://www.chatbase.co/embed.min.js'
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    window.chatbaseConfig = {
                        chatbotId: "${CHATBASE_ID}",
                        }
                    `
            }}
          />
        </>
      )}

      {CLARITY_ID && (
        <>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(c, l, a, r, i, t, y) {
                  c[a] = c[a] || function() {
                    (c[a].q = c[a].q || []).push(arguments);
                  };
                  t = l.createElement(r);
                  t.async = 1;
                  t.src = "https://www.clarity.ms/tag/" + i;
                  y = l.getElementsByTagName(r)[0];
                  if (y && y.parentNode) {
                    y.parentNode.insertBefore(t, y);
                  } else {
                    l.head.appendChild(t);
                  }
                })(window, document, "clarity", "script", "${CLARITY_ID}");
                `
            }}
          />
        </>
      )}

      {COMMENT_DAO_VOICE_ID && (
        <>
          {/* DaoVoice 反馈 */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(i, s, o, g, r, a, m) {
                  i["DaoVoiceObject"] = r;
                  i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments);
                  };
                  i[r].l = 1 * new Date();
                  a = s.createElement(o);
                  m = s.getElementsByTagName(o)[0];
                  a.async = 1;
                  a.src = g;
                  a.charset = "utf-8";
                  if (m && m.parentNode) {
                    m.parentNode.insertBefore(a, m);
                  } else {
                    s.head.appendChild(a);
                  }
                })(window, document, "script", ('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/daf1a94b.js", "daovoice")
                `
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
             daovoice('init', {
                app_id: "${COMMENT_DAO_VOICE_ID}"
              });
              daovoice('update');
              `
            }}
          />
        </>
      )}

      {/* HILLTOP广告验证 */}
      {HILLTOP_ADS_META_ID && (
        <Head>
          <meta name={HILLTOP_ADS_META_ID} content={HILLTOP_ADS_META_ID} />
        </Head>
      )}

      {AD_WWADS_ID && (
        <>
          <Head>
            {/* 提前连接到广告服务器 */}
            <link rel='preconnect' href='https://cdn.wwads.cn' />
          </Head>
          <ExternalScript
            type='text/javascript'
            src='https://cdn.wwads.cn/js/makemoney.js'
          />
        </>
      )}

      {/* {COMMENT_TWIKOO_ENV_ID && <script defer src={COMMENT_TWIKOO_CDN_URL} />} */}

      {COMMENT_ARTALK_SERVER && <script defer src={COMMENT_ARTALK_JS} />}

      {COMMENT_TIDIO_ID && (
        <script async src={`//code.tidio.co/${COMMENT_TIDIO_ID}.js`} />
      )}

      {/* gitter聊天室 */}
      {COMMENT_GITTER_ROOM && (
        <>
          <script
            src='https://sidecar.gitter.im/dist/sidecar.v1.js'
            async
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            ((window.gitter = {}).chat = {}).options = {
              room: '${COMMENT_GITTER_ROOM}'
            };
            `
            }}
          />
        </>
      )}

      {/* 百度统计 */}
      {ANALYTICS_BAIDU_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${ANALYTICS_BAIDU_ID}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
          `
          }}
        />
      )}

      {/* 站长统计 */}
      {ANALYTICS_CNZZ_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_${ANALYTICS_CNZZ_ID}'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D${ANALYTICS_CNZZ_ID}' type='text/javascript'%3E%3C/script%3E"));
          `
          }}
        />
      )}

      {/* 谷歌统计 */}
      {ANALYTICS_GOOGLE_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_GOOGLE_ID}', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </>
      )}

      {/* Chatbot 嵌入代码 */}
      {(
        <>
          <script
            async
            src="https://nfhiadeo.sealosbja.site/js/iframe.js"
            id="chatbot-iframe"
            data-bot-src="https://nfhiadeo.sealosbja.site/chat/share?shareId=7nwr82lzo4jgsfbh4sayzzg0&showHistory=0" 
            data-default-open="false"
            data-drag="false"
            data-open-icon="data:image/png;base64,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"
            data-close-icon="data:image/png;base64,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"
            defer
          />
        </>
      )}

      {/* Matomo 统计 */}
      {MATOMO_HOST_URL && MATOMO_SITE_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//${MATOMO_HOST_URL}/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `
          }}
        />
      )}
    </>
  )
}

const TwikooCommentCounter = dynamic(
  () => import('@/components/TwikooCommentCounter'),
  { ssr: false }
)
const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
  ssr: false
})
const ThemeSwitch = dynamic(() => import('@/components/ThemeSwitch'), {
  ssr: false
})
const Fireworks = dynamic(() => import('@/components/Fireworks'), {
  ssr: false
})
const MouseFollow = dynamic(() => import('@/components/MouseFollow'), {
  ssr: false
})
const Nest = dynamic(() => import('@/components/Nest'), { ssr: false })
const FlutteringRibbon = dynamic(
  () => import('@/components/FlutteringRibbon'),
  { ssr: false }
)
const Ribbon = dynamic(() => import('@/components/Ribbon'), { ssr: false })
const Sakura = dynamic(() => import('@/components/Sakura'), { ssr: false })
const StarrySky = dynamic(() => import('@/components/StarrySky'), {
  ssr: false
})
const DifyChatbot = dynamic(() => import('@/components/DifyChatbot'), {
  ssr: false
})
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then(async m => {
      return m.Analytics
    }),
  { ssr: false }
)
const MusicPlayer = dynamic(() => import('@/components/Player'), { ssr: false })
const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const Messenger = dynamic(() => import('@/components/FacebookMessenger'), {
  ssr: false
})
const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })
const CustomContextMenu = dynamic(
  () => import('@/components/CustomContextMenu'),
  { ssr: false }
)
const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
  ssr: false
})
const AdBlockDetect = dynamic(() => import('@/components/AdBlockDetect'), {
  ssr: false
})
const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
})
const AosAnimation = dynamic(() => import('@/components/AOSAnimation'), {
  ssr: false
})

const Coze = dynamic(() => import('@/components/Coze'), {
  ssr: false
})
const LA51 = dynamic(() => import('@/components/LA51'), {
  ssr: false
})
const TianliGPT = dynamic(() => import('@/components/TianliGPT'), {
  ssr: false
})

export default ExternalPlugin
