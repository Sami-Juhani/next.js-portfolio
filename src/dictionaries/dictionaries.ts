import "server-only"

interface Dictionary {
  [key: string]: () => Promise<any>
}

const dictionaries: Dictionary = {
  en: () => import("./en.json").then((module) => module.default),
  fi: () => import("./fi.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<any> => {
  if (dictionaries[locale]) {
    return dictionaries[locale]()
  } else {
    throw new Error(`No dictionary found for locale: ${locale}`)
  }
}
