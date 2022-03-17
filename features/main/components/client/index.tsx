import Image from "next/image"
import Select from 'react-select'
import { CalculateClientData } from "../../../utils/calculator"

export const Client = () => {
    const trainingFrequency = [
        {
            value: 1.3,
            label: 'Sedentário'
        },
        {
            value: 1.5,
            label: 'Ligeiramente ativo'
        },
        {
            value: 1.7,
            label: 'Moderadamente ativo'
        },
        {
            value: 1.9,
            label: 'Muito ativo'
        },
    ]
    const trainingLevel = [
        {
            value: 1.10,
            label: 'Avançado'
        },
        {
            value: 1.15,
            label: 'Intermediário'
        },
        {
            value: 1.2,
            label: 'Iniciante'
        },
    ]
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const client_name = event.target.client_name.value
        const weight_kg = event.target.weight_kg.value
        const training_frequency = event.target.training_frequency.value
        const training_level = event.target.training_level.value
        const energetic_value = CalculateClientData({ weight_kg, training_frequency, training_level })
        console.log(energetic_value)
        event.target.reset();
    }
    return (
        <div>
            <form style={{ width: '100%', marginBottom: '40px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ width: '180px', display: 'grid' }}>
                        <label>Nome: </label>
                        <input type="text" name="client_name" step=".01"
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
                    <div style={{ width: '180px', display: 'grid' }}>
                        <label>Peso (kg): </label>
                        <input type="number" name="weight_kg" step=".01"
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
                        <label>Frequência de treino: </label>
                        <Select name="training_frequency" placeholder="Selecione" isClearable options={trainingFrequency} />
                    </div>
                    <div style={{ width: '100%' }}>
                        <label>Nível de treinamento: </label>
                        <Select name="training_level" placeholder="Selecione" isClearable options={trainingLevel} />
                    </div>
                    <button
                        style={{ border: 'none', backgroundColor: 'transparent', width: '50px', height: '38px', cursor: 'pointer' }}
                        type="submit"
                    >
                        <Image width="38px" height="38px" src="/icons/addition.png" alt="Adicionar" />
                    </button>
                </div>
            </form>
        </div>
    )
}
