'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import styles from "../css/page.module.css";

const classNames = require('classnames');

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`)
    router.push(newPath)
  }

  return (
    <div className={classNames(styles.switcher)}>
      <button onClick={() => switchLanguage('en-US')}>EN</button>
      <button onClick={() => switchLanguage('es-MX')}>ES</button>
    </div>
  )
}