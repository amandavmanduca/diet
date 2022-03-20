
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { Food, Meal, Sum } from '../../../utils/types'
import Select from 'react-select'
import Image from 'next/image';

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
    const [select, setSelect] = useState<any>()
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
        setSelect(null)
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
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <h3 style={{ marginBottom: '10px' }}>{meal.name} - {meal.time}</h3>
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
            
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ width: '180px', display: 'grid' }}>
                        <label>Quantidade (g): </label>
                        <input type="number" name="chosen_food_qty"
                            style={{
                                borderColor: 'hsl(0, 0%, 80%)',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                minHeight: '38px',
                                borderStyle: 'solid',
                                backgroundColor: 'hsl(0, 0%, 100%)',
                                borderWidth: '1px',
                                outline: '0!important',
                                fontSize: '14px',
                                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
                            }}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <label>Alimento: </label>
                        <Select name="chosen_food" value={select} placeholder="Selecione o alimento" isClearable options={selectOptions} />
                    </div>
                    <button
                        style={{ border: 'none', backgroundColor: 'transparent', width: '50px', height: '38px', cursor: 'pointer' }}
                        type="submit"
                    >
                        <Image width="38px" height="38px" src="/icons/addition.png" alt="Adicionar" />
                    </button>
                </div>
            </form>
            <div style={{ marginBottom: '30px' }}>
                <h4>Totais</h4>
                <div style={{ display: 'flex', gap: '30px'}}>
                    <p>PTN: {sum.protein.toFixed(2)}g</p>
                    <p>CHO: {sum.carbohydrate.toFixed(2)}g</p>
                    <p>LIP: {sum.lipid.toFixed(2)}g</p>
                    <p>CAL: {sum.cal.toFixed(2)}g</p>
                </div>
            </div>
            {foods?.length > 0 && (
                <>
                    <h4>Alimentos Selecionados</h4>
                    {foods?.map((food: Food, index) => (
                        <div key={index}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderBottom: '1px solid',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderColor: '#D0D0D0'
                            }}>
                            <p>{food?.description}; (Grama: {food?.chosen_qty})</p>
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
                </>
            )}

        </div>
    )
}