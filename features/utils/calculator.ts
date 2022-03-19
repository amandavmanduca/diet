
export const CalculateClientData = (values: {
    weight_kg: number,
    training_frequency: number,
    training_level: number
}) => {
    const weight_lb = values.weight_kg * 2.20462
    const tmr = weight_lb * 10
    const maintenance_cal = tmr * values.training_frequency
    const total_energetic_value = maintenance_cal * values.training_level
    return Number(total_energetic_value.toFixed(3))
}