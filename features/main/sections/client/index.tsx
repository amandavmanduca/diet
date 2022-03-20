import Image from "next/image"
import Select from 'react-select';
import { CalculateClientData } from "../../../utils/calculator"
import { trainingFrequency, trainingLevel } from '../../../utils/training-options'
import React, { useContext } from "react"
import { GeneralContext } from "../../context"
import styles from '../section-styles.module.css'

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
        <div className={styles.clientCard}>
            <form style={{ width: '100%', padding: '20px 0px' }} onSubmit={handleSubmit}>
                <div className={styles.clientItemsCard}>
                    <div style={{ width: '100%' }}>
                        <h4 className={styles.h4subTitle}>Nome</h4>
                        <input type="text" name="client_name" step=".01" defaultValue={general?.client?.client_name}
                            className={styles.input}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h4 className={styles.h4subTitle}>Peso (kg)</h4>
                        <input type="number" name="weight_kg" step=".01" defaultValue={general?.client?.weight_kg}
                            className={styles.input}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h4 className={styles.h4subTitle}>Frequência de treino</h4>
                        <Select
                            name="training_frequency"
                            placeholder="Selecione"
                            isClearable
                            options={trainingFrequency} />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h4 className={styles.h4subTitle}>Nível de treinamento</h4>
                        <Select
                            name="training_level"
                            placeholder="Selecione"
                            isClearable
                            options={trainingLevel}
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
        </>
    )
}
