import i18n from '@/i18n/index'
export function generateTitle(title: string) {
  return i18n.global.t('msg.route.' + title)
}
