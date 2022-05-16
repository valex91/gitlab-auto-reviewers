export const KEY_ID = '__GL_KEY__'
const chromeStorage = chrome.storage.local

export const set = (values: Record<string,unknown>): Promise<void> => {
    return new Promise((res, rej) => {
        chromeStorage.set(values, () => {
            res()
        })
    })
}

export const get = (value: string): Promise<string> => {
    return new Promise((res) => {
        chromeStorage.get(value, (result: Record<string, string>) => {
            res(result[value])
        })
    })
}

export const clear = (): Promise<void> => {
    return new Promise((res) => {
        chromeStorage.clear(() => {
            res()
        })
    })
}