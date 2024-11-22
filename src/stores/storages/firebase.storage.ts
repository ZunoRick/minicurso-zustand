import { createJSONStorage, StateStorage } from "zustand/middleware";

const fireBaseUrl = 'https://zustand-storage-31b45-default-rtdb.firebaseio.com/zustand'

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${ fireBaseUrl }/${ name }.json`).then(res => res.json());
            console.log(data);
            return JSON.stringify(data)
        } catch (error) {
            throw error;
        }
    },

    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${ fireBaseUrl }/${ name }.json`, {
            method: 'PUT',
            body: value
        }).then(res => res.json());
        
        return;
    },

    removeItem: function (name: string): unknown | Promise<unknown> {
        console.log('removeItem', name);
        return null
    }
}

export const firebaseStorage = createJSONStorage(() => storageApi)