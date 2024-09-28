import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'


export const useAppStore = create(
    persist(
        (set, get) => ({
            fishList: [],
            headerBackgroundColor: '#6200ee',
            setHeaderBackgroundColor: (color) => set(() => ({ headerBackgroundColor: color })),
            getBackgroudColor: () => {
                return get().headerBackgroundColor
            },
            addAFish: (fish)  => {
                set((state) => {
                    fishList: [fish, ...state.fishList]
                })
            }
        }),
        {
            name: 'foodza',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)

// export const cartStore = create((set) => ({
//     cart: [],
//     addItems : (item) => {
//         set(() => ({ cart : [item , ...cart] }))
//     }
// }))