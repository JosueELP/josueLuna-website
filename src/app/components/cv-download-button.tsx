"use client"

import { useState } from "react"
import styles from "../css/page.module.css";

const classNames = require('classnames');

interface DownloadButtonProps {
  dictionary: { [key: string]: string }
}

export default function Component({ dictionary }: DownloadButtonProps) {
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
      <div className={classNames(styles.dropdown)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.dropdownToggle, styles.fontAiWritter)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className={classNames(styles.dropdownText)}>
            {language === "es" ? dictionary.esLanguageLabel : dictionary.enLanguageLabel}
          </div>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={classNames(styles.drowdownIcon)} stroke="000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#a4958b"></path> </g></svg>
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