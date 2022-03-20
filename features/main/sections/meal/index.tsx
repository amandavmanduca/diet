
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { Food, Meal, Sum } from '../../../utils/types'
import Select from 'react-select'
import Image from 'next/image';
import styles from '../section-styles.module.css'

type Props = {
    meal: Meal;
    updateMealSum: (values: any) => void
    removeEntireMeal: MouseEventHandler<HTMLImageElement>
}

export const MealPage = ({
    meal,
    updateMealSum,
    removeEntireMeal,
}: Props) => {
    const tacoTableData = require('../../../utils/taco-table.json'); 
    const [foods, setFoods] = useState<Food[]>(meal?.foods)
    const setFood = (tableFood: any, qty: number) => {
        if (tableFood) {
            const foodToAdd: Food = {
                id: tableFood?.id,
                description: tableFood?.description,
                attributes: {
                    protein: {
                        qty: tableFood?.attributes?.protein?.qty
                    },
                    carbohydrate:{
                        qty: tableFood?.attributes?.carbohydrate?.qty
                    },
                    lipid: {
                        qty: tableFood?.attributes?.lipid?.qty
                    },
                    energy: {
                        kcal: tableFood?.attributes?.energy?.kcal
                    },
                },
                base_qty: 100,
                chosen_qty: qty,
            }
            return foodToAdd
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const food = tacoTableData[(event.target.chosen_food.value)-1]
        const qty = event.target.chosen_food_qty.value
        const foodToAdd: Food | undefined = setFood(food, qty)
        if (foodToAdd) {
            const allFoods = [...foods, foodToAdd]
            setFoods(allFoods)
        }
        event.target.reset();
    }
    const removeMeal = (id: number) => {
        const filteredArray = foods.filter(m => m.id !== id)
        setFoods(filteredArray)
    }
    function formatValue (value: number, base: number, qty: number) {
        if (!value) {
            return 0
        }
        const formatedValue: number = (qty/base) * (value)
        return formatedValue
    }

    const sum: Sum = useMemo(() => {
        let sum: Sum = {
            protein: 0,
            carbohydrate: 0,
            lipid: 0,
            cal: 0,
        }
        if (foods) {
            foods?.map(f => {
                    sum.protein = sum.protein + formatValue(f.attributes.protein.qty, f.base_qty, f.chosen_qty),
                    sum.carbohydrate = sum.carbohydrate + formatValue(f.attributes.carbohydrate.qty, f.base_qty, f.chosen_qty),
                    sum.lipid = sum.lipid + formatValue(f.attributes.lipid.qty, f.base_qty, f.chosen_qty)
                    sum.cal = sum.cal + formatValue(f.attributes.energy.kcal, f.base_qty, f.chosen_qty)
                }
            )
        }
        return sum
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foods])

    const selectOptions = tacoTableData?.map((r: any) => ({
        value: r.id,
        label: r.description
    }))

    useEffect(() => {
        updateMealSum({
            meal: {
                id: meal.id,
                name: meal.name,
                time: meal.time,
                foods: foods,
            },
            mealSum: sum,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sum])

    return (
        <div style={{ width: '100%', marginTop: '20px', backgroundColor: '#F5F5F5', padding: '40px 20px', borderRadius: '4px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <h3 style={{ marginBottom: '10px', textTransform: 'uppercase', color: '#98D1BA' }}>{meal.name} - {meal.time}</h3>
                    <div style={{ cursor: 'pointer' }}>
                        <Image
                            onClick={removeEntireMeal}
                            width="20px"
                            height="20px"
                            src="/icons/rubbish-bin.png"
                            alt="Remover"
                        />
                    </div>
                </div>                 
                <div style={{ display: 'flex', gap: '30px'}}>
                    <p style={{ color: '#97A1C1', fontSize: '14px', fontWeight: '500' }}>PTN: {sum.protein.toFixed(2)}g</p>
                    <p style={{ color: '#EBB490', fontSize: '14px', fontWeight: '500' }}>CHO: {sum.carbohydrate.toFixed(2)}g</p>
                    <p style={{ color: '#98D1BA', fontSize: '14px', fontWeight: '500' }}>LIP: {sum.lipid.toFixed(2)}g</p>
                    <p style={{ color: 'gray', fontSize: '14px', fontWeight: '500' }}>CAL: {sum.cal.toFixed(2)}g</p>
                </div>
            </div>
            
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ width: '180px', display: 'grid' }}>
                        <h4 style={{ color: '#696969' }}>Quantidade (g):</h4>
                        <input type="number" name="chosen_food_qty"
                            className={styles.input}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h4 style={{ color: '#696969' }}>Alimento</h4>
                        <Select name="chosen_food" placeholder="Selecione o alimento" isClearable options={selectOptions} />
                    </div>
                    <button
                        className={styles.additionButton}
                        type="submit"
                    >
                        <p>+</p>
                    </button>
                </div>
            </form>
            {foods?.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                    <h4 style={{ color: '#696969' }}>Alimentos Selecionados</h4>
                    {meal?.foods?.map((food: Food) => (
                        <div key={food.id}
                            style={{
                                width: '100%',
                                padding: '6px',
                                borderBottom: '1px solid',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderColor: '#D0D0D0',
                                alignItems: 'flex-end'
                            }}>
                            <p style={{ fontSize: '14px', fontWeight: '500', color: 'gray' }}>{food?.description}; (Grama: {food?.chosen_qty})</p>
                            <div style={{ cursor: 'pointer' }}>
                                <Image
                                    onClick={() => removeMeal(food.id)}
                                    width="20px"
                                    height="20px"
                                    src="/icons/rubbish-bin.png"
                                    alt="Remover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}