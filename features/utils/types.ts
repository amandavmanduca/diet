export type Food = {
    id: number,
    description: string,
    attributes: {
        protein: {
            qty: number
        },
        carbohydrate: {
            qty: number
        },
        lipid: {
            qty: number
        },
        energy: {
            kcal: number
        }
    }
    base_qty: number,
    chosen_qty: number,
}

export type Meal = {
    id: number,
    name: string,
    time: string,
    sum: Sum
}

export type Sum = {
    protein: number;
    carbohydrate: number;
    lipid: number;
    cal: number;
}
