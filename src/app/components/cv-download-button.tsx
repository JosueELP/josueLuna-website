"use client"

import { useState } from "react"
import styles from "../page.module.css";

const classNames = require('classnames');

interface DownloadButtonProps {
  dictionary: { [key: string]: string }
}

export default function Component({ dictionary } : DownloadButtonProps) {
  const [language, setLanguage] = useState<"es" | "en">("en")
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = () => {
    const fileName = language === "es" ? "josueluna-cv-es.pdf" : "josueluna-cv-en.pdf"
    // alert(`Downloading ${fileName}`)
    // In a real scenario, you might do something like this:
    const pdfUrl = `/assets/pdf/${fileName}`
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className={classNames(styles.cvDownloadContainer)}>
      <button onClick={handleDownload} className={classNames(styles.downloadButton, styles.fontAiWritter, styles.bold)}>
        <svg xmlns="http://www.w3.org/2000/svg" className={classNames(styles.downloadIcon)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {dictionary.contactMeDownloadButton}
      </button>
      <div>
        <p>{dictionary.contactMeDownloadArrow}</p>
      </div>
      <div className={classNames(styles.dropdown)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.dropdownToggle, styles.fontAiWritter)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {language === "es" ? dictionary.esLanguage : dictionary.enLanguage}
        </button>
        {isOpen && (
          <div className={classNames(styles.dropdownMenu)} role="menu">
            <button
              onClick={() => {
                setLanguage("en")
                setIsOpen(false)
              }}
              className={classNames(styles.dropdownItem, styles.fontAiWritter)}
              role="menuitem"
            >
              {dictionary.enLanguage}
            </button>
            <button
              onClick={() => {
                setLanguage("es")
                setIsOpen(false)
              }}
              className={classNames(styles.dropdownItem, styles.fontAiWritter)}
              role="menuitem"
            >
              {dictionary.esLanguage}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}