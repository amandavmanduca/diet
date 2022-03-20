import Image from "next/image"
import Select from 'react-select';
import { CalculateClientData } from "../../../utils/calculator"
import { trainingFrequency, trainingLevel } from '../../../utils/training-options'
import React, { useContext, useEffect, useState } from "react"
import { GeneralContext } from "../../context"

type Props = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const Client = ({ show, setShow }: Props) => {
    const { general, setGeneral } = useContext(GeneralContext);
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const client_name = event.target.client_name.value
        const weight_kg = event.target.weight_kg.value
        const training_frequency = event.target.training_frequency.value
        const training_level = event.target.training_level.value
        const energetic_value = CalculateClientData({ weight_kg, training_frequency, training_level })
        setGeneral({
            client: {
                client_name: client_name,
                weight_kg: weight_kg,
                training_frequency: training_frequency,
                training_level: training_level,
                energetic_value: energetic_value,
            },
            meals: []
        })
        event.target.reset();
        setShow(false)
    }
    

    return (
        <>
        {show && (
        <div style={{ marginBottom: '10px', boxShadow: '0 2px 2px -2px rgba(0,0,0,.2)' }}>
            <form style={{ width: '100%', marginBottom: '25px' }} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ width: '180px', display: 'grid' }}>
                        <h4 style={{ color: '#696969' }}>Nome</h4>
                        <input type="text" name="client_name" step=".01" defaultValue={general?.client?.client_name}
                            style={{
                                minHeight: '38px',
                            }}
                        />
                    </div>
                    <div style={{ width: '180px', display: 'grid' }}>
                        <h4 style={{ color: '#696969' }}>Peso (kg)</h4>
                        <input type="number" name="weight_kg" step=".01" defaultValue={general?.client?.weight_kg}
                            style={{
                                minHeight: '38px',
                            }}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h4 style={{ color: '#696969' }}>Frequência de treino</h4>
                        <Select
                            name="training_frequency"
                            placeholder="Selecione"
                            isClearable
                            options={trainingFrequency} />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h4 style={{ color: '#696969' }}>Nível de treinamento</h4>
                        <Select
                            name="training_level"
                            placeholder="Selecione"
                            isClearable
                            options={trainingLevel}
                        />
                    </div>
                    <button
                        style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                        type="submit"
                    >
                        <p style={{ fontSize: '30px' }}>+</p>
                    </button>
                </div>
            </form>
        </div>
        )}
        </>
    )
}
