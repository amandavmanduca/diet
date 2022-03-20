import Image from "next/image"
import { useCallback, useContext, useEffect, useState } from "react"
import { Meal, Sum } from "../../../utils/types"
import { MealPage } from "../meal"
import { GeneralContext } from "../../context"
import styles from '../section-styles.module.css'

export const MealsPage = () => {
    const { general, setGeneral } = useContext(GeneralContext);

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const name = event.target.name.value
        const time = event.target.time.value
        const currentMeal = [...general.meals, {
            id: (Math.random() * 99),
            name: name,
            time: time,
            foods: [],
            sum: {
                protein: 0,
                carbohydrate: 0,
                lipid: 0,
                cal: 0,
            }
        }]
        setGeneral({ client: general?.client, meals: currentMeal })
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
            const meal = general.meals.find((m: Meal) => m.id === values.meal.id && m.name === values?.meal.name)
            if (meal) {
                const currentMeal: Meal = {
                    id: meal.id,
                    name: meal.name,
                    time: meal.time,
                    foods: values.meal.foods,
                    sum: values.mealSum,
                }
                const otherMeals = general.meals.filter((m: Meal) => m.id !== values.meal.id && m.name !== values?.meal.name )
                const currentMeals = [
                    ...otherMeals,
                    currentMeal
                ]
                const sortedMeals = currentMeals.sort((a, b) => a.time.localeCompare(b.time))
                setGeneral({ client: general?.client, meals: sortedMeals })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [general.meals])

    useEffect(() => {
        let sum: Sum = {
            protein: 0,
            carbohydrate: 0,
            lipid: 0,
            cal: 0,
        }
        if (general.meals) {
            general.meals.map((m: Meal) => {
                    sum.protein = sum.protein + m.sum.protein,
                    sum.carbohydrate = sum.carbohydrate + m.sum.carbohydrate,
                    sum.lipid = sum.lipid + m.sum.lipid,
                    sum.cal = sum.cal + m.sum.cal
                }
            )
            setMealsSum(sum)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [general.meals])
        
    const removeEntireMeal = (id: number) => {
        const filteredArray = general.meals.filter((m: any) => m.id !== id)
        setGeneral({ client: general?.client, meals: filteredArray })
    }

    const getMacroPercentage = (mealsSum: Sum, current: number) => {
        const total = mealsSum.protein + mealsSum.carbohydrate + mealsSum.lipid
        const percentage = (current / total) * 100
        return percentage || 0
    }

    return (
        <div>
            {general?.client && (
                <div className={styles.mealsCard}>
                    <div className={styles.totalsItemsCard}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{ textTransform: 'uppercase', fontWeight: '500' }}>{general?.client?.client_name}</p>
                            <label style={{ fontSize: '12px' }}>Calorias (cal)</label>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p>{general?.client?.energetic_value.toFixed(0)}</p>
                                    <label style={{ fontSize: '12px' }}>Meta</label>
                                </div>
                                <p>-</p>
                                <div style={{ textAlign: 'center' }}>
                                    <p>{mealsSum.cal.toFixed(0)}</p>
                                    <label style={{ fontSize: '12px' }}>Alimentos</label>
                                </div>
                                <p>=</p>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        color: Number((Number(general?.client?.energetic_value) - Number(mealsSum.cal)).toFixed(0)) >= 0 ? '#8FBDDE' : '#FF5733'
                                    }}
                                >
                                    <p>{(Number(general?.client?.energetic_value) - Number(mealsSum.cal)).toFixed(0)}</p>
                                    <label style={{ fontSize: '12px' }}>Restantes</label>
                                </div>
                            </div>
                        </div>
                        {Number(mealsSum.cal) > 0 && (
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h4>Distribuições Totais</h4>
                                    <div style={{ width: '280px', display: 'flex', height: '35px', marginTop: '5px' }}>
                                        <div style={{ fontSize: '14px', width: `${getMacroPercentage(mealsSum, mealsSum.protein)}%`, backgroundColor: '#97A1C1', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                            {getMacroPercentage(mealsSum, mealsSum.protein).toFixed(0)}%
                                        </div>
                                        <div style={{ fontSize: '14px', width: `${getMacroPercentage(mealsSum, mealsSum.carbohydrate)}%`, backgroundColor: '#EBB490', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                            {getMacroPercentage(mealsSum, mealsSum.carbohydrate).toFixed(0)}%
                                        </div>
                                        <div style={{ fontSize: '14px', width: `${getMacroPercentage(mealsSum, mealsSum.lipid)}%`, backgroundColor: '#98D1BA', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                            {getMacroPercentage(mealsSum, mealsSum.lipid).toFixed(0)}%
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                                        <p style={{ color: '#97A1C1', fontSize: '14px', fontWeight: '500' }}>PTN: {mealsSum.protein.toFixed(2)}g</p>
                                        <p style={{ color: '#EBB490', fontSize: '14px', fontWeight: '500' }}>CHO: {mealsSum.carbohydrate.toFixed(2)}g</p>
                                        <p style={{ color: '#98D1BA', fontSize: '14px', fontWeight: '500' }}>LIP: {mealsSum.lipid.toFixed(2)}g</p>
                                        <p style={{ color: 'gray', fontSize: '14px', fontWeight: '500' }}>CAL: {mealsSum.cal.toFixed(2)}g</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {general?.client?.client_name && (
                <div className={styles.mealsCard}>
                    <h4 style={{ color: '#505050' }}>Adicionar refeição</h4>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onSubmit={handleSubmit}>
                        <div className={styles.newMealItemCard}>
                            <div style={{ display: 'grid' }}>
                                <h4 className={styles.h4subTitle}>Nome</h4>
                                <input type="text" name="name"
                                    className={styles.input}
                                />
                            </div>
                            <div style={{ display: 'grid' }}>
                                <h4 className={styles.h4subTitle}>Hora</h4>
                                <input type="time" name="time"
                                    className={styles.input}
                                />
                            </div>
                            <button
                                className={styles.additionButton}
                                type="submit"
                            >
                                <p>+</p>
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {general?.meals?.length > 0 && general.meals.map((m: Meal) => (
                <div key={m.id}>
                    <MealPage
                        meal={m}
                        updateMealSum={updateMealSum}
                        removeEntireMeal={() => removeEntireMeal(m.id)}
                    />
                </div>
            ))}
        </div>
    )
}