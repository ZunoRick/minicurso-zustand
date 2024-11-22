import { createJSONStorage, StateStorage } from "zustand/middleware";

const storageApi: StateStorage = {
    getItem: function (name: string): string | null | Promise<string | null> {
        const data = sessionStorage.getItem(name)
        return data
    },
    setItem: function (name: string, value: string): void {
        sessionStorage.setItem(name, value)
    },
    removeItem: function (name: string): unknown | Promise<unknown> {
        console.log('removeItem', name);
        return null
    }
}

export const customSessionStorage = createJSONStorage(() => storageApi)