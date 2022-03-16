import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Meal, Sum } from "../../../utils/types"
import { MealPage } from "../meal"

export const MealsPage = () => {
    const [meals, setNewMeal] = useState<Meal[]>([])
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const name = event.target.name.value
        const time = event.target.time.value
        setNewMeal([...meals, {
            name: name,
            time: time,
            sum: {
                protein: 0,
                carbohydrate: 0,
                lipid: 0,
                cal: 0,
            }
        }])
        event.target.reset();
    }
    const [mealsSum, setMealsSum] = useState<Sum>({
        protein: 0,
        carbohydrate: 0,
        lipid: 0,
        cal: 0,
    })
    const updateMealSum = useCallback((values) => {
        if (values) {
            const meal = meals.find((m: Meal) => m.name === values.mealName)
            if (meal) {
                const currentMeal: Meal = {
                    name: meal.name,
                    time: meal.time,
                    sum: values.mealSum,
                }
                const otherMeals = meals.filter((m: Meal) => m.name !== values.mealName)
                setNewMeal([
                    ...otherMeals,
                    currentMeal
                ])
            }
        }
    }, [meals, setNewMeal])

    useEffect(() => {
        let sum: Sum = {
            protein: 0,
            carbohydrate: 0,
            lipid: 0,
            cal: 0,
        }
        if (meals) {
            meals?.map((m: Meal) => {
                    sum.protein = sum.protein + m.sum.protein,
                    sum.carbohydrate = sum.carbohydrate + m.sum.carbohydrate,
                    sum.lipid = sum.lipid + m.sum.lipid,
                    sum.cal = sum.cal + m.sum.cal
                }
            )
            setMealsSum(sum)
        }
        localStorage.setItem("savedMeals", JSON.stringify(meals));
    }, [meals])

    return (
        <div>
            <form style={{ width: '100%', marginBottom: '40px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ width: '180px', display: 'grid' }}>
                        <label>Nome: </label>
                        <input type="text" name="name"
                            style={{
                                borderColor: 'hsl(0, 0%, 80%)',
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
                    <div style={{ width: '180px', display: 'grid' }}>
                        <label>Hora: </label>
                        <input type="time" name="time"
                            style={{
                                borderColor: 'hsl(0, 0%, 80%)',
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
                    <p>PTN: {mealsSum.protein.toFixed(2)}g</p>
                    <p>CHO: {mealsSum.carbohydrate.toFixed(2)}g</p>
                    <p>LIP: {mealsSum.lipid.toFixed(2)}g</p>
                    <p>CAL: {mealsSum.cal.toFixed(2)}g</p>
                </div>
            </div>
            {meals?.map((m: Meal, index: number) => (
                <div key={index}>
                    <MealPage name={m.name} time={m.time} updateMealSum={updateMealSum} />
                </div>
            ))}
        </div>
    )
}